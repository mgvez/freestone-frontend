//SHARED

const fieldsSelector = state => state.freestone.schema.fields;
import md5 from 'md5';
import { createSelector } from 'reselect';
import { tableSchemaMapStateToProps, parentTableSchemaMapStateToProps } from './tableSchema';
import { recordMapStateToProps, parentRecordMapStateToProps, recordUnalteredMapStateToProps } from './record';
import { isGodSelector } from './credentials';

const envSelector = state => state.freestone.env.freestone;
const childrenSelector = state => state.freestone.schema.children;

//checks if the value of a field matches a rule, so as to influence the display/hide of other fields
function checkRule(rule, val) {
	const boolRule = rule.toUpperCase();
	if (boolRule === '*') return true;
	if (boolRule === 'TRUE') {
		return !!val && val !== '0';
	} else if (boolRule === 'FALSE') {
		return !val || val === '0';
	}

	//next tests only valid if field has value
	if (!val || val === '0') return false;

	//regexp?
	if (rule[0] === '/') {
		const pattern = rule.substr(1, rule.lastIndexOf('/') - 1);
		const modifiers = rule.substr(rule.lastIndexOf('/') + 1);
		return RegExp(pattern, modifiers).test(val);
	}

	return rule.split(';').reduce((isCheck, singleRule) => {
		return isCheck || singleRule === String(val);
	}, false);
}

/**
Retrieve rules where fields are displayed/hidden depending on other field's values. Will output an object {[fieldId]:isDisplayed}
*/
function parseDependencies(table, record) {
	if (!record) return null;
	const { fieldDependencies } = table;
	const controlFieldIds = fieldDependencies && Object.keys(fieldDependencies);
	if (!controlFieldIds || controlFieldIds.length === 0) return null;

	// console.log(fieldDependencies);
	// console.log(record);
	// console.log(table.fields);

	//defaults all depending fields to the inverse of their set rules, that is, if rules are for displaying a field, hide it until we match a rule
	const dependenciesValues = controlFieldIds.reduce((defaults, controlFieldId) => {
		return fieldDependencies[controlFieldId].reduce((carry, rule) => {
			const { dependingFieldId } = rule;
			//sets default if first time we encounter this depending field in the loop
			if (carry[dependingFieldId] === undefined) {
				carry[dependingFieldId] = {
					isDisplay: !rule.isDisplay,
					descriptionAppend: '',
					titleOverride: '',
					forceDisplay: undefined,
				};
			}

			if (rule.rule === '*') carry[dependingFieldId].forceDisplay = rule.forceDisplay;

			//does the control field value match the rule?
			const ruleApplies = checkRule(rule.rule, record[controlFieldId]);
			// console.log(rule.rule, controlFieldId, dependingFieldId, ruleApplies);
			if (ruleApplies) {
				// console.log('%s applies displays (%s)', rule.rule, rule.isDisplay);
				// console.log(carry[dependingFieldId]);

				carry[dependingFieldId].isDisplay = typeof carry[dependingFieldId].forceDisplay === 'undefined' ? rule.isDisplay : carry[dependingFieldId].forceDisplay;
				carry[dependingFieldId].descriptionAppend = (carry[dependingFieldId].descriptionAppend || '') + (rule.descriptionAppend || '');
				carry[dependingFieldId].titleOverride = rule.titleOverride;
			}

			return carry;
		}, defaults);
	}, {});
	// console.log(dependenciesValues);

	return dependenciesValues;
}

//create groups according to separators
function createFieldGroups(fields) {
	return (fields || []).reduce((groups, curField) => {
		const isSeparator = curField.type === 'separator';
		const isPlaceholder = !!curField.subformPlaceholder;
		let curGroup = groups[groups.length - 1];
		//new group when separator, or when current or previous field was a subfrom placeholder. Placeholders are always alone in their group
		if (isSeparator || isPlaceholder || !curGroup || curGroup.isPlaceholder) {
			curGroup = {
				label: (isSeparator && curField.label) || null,
				key: '',
				isPlaceholder,
				fields: [],
			};
			groups.push(curGroup);
		}
		curGroup.key += `${curField.id}-`;
		if (!isSeparator) {
			curGroup.fields.push(curField);
		}
		return groups;
	}, []).map(gr => {
		gr.key = md5(gr.key);
		return gr;
	});
}

function makeSelector(tableSchemaSelector, recordSelector, recordUnalteredSelector, parentTableSchemaSelector, parentRecordSelector) {

	return createSelector(
		[tableSchemaSelector, fieldsSelector, recordSelector, recordUnalteredSelector, childrenSelector, envSelector, parentTableSchemaSelector, parentRecordSelector, isGodSelector],
		(schema, allFields, record, recordUnaltered, unfilteredChildren, env, parentSchema, parentRecord, isGod) => {
			let { table } = schema;
			let children;
			let mainFields;
			let asideFields;
			// const recordId = record && record[PRIKEY_ALIAS];
			// console.log(`build record for ${recordId}`, table && table.name);
			// console.log(formCollapsed);
			
			//some subforms are parsed in between fields through placeholders. If so, we don't replace them in remaining children loop, so we have to remove them from children
			if (table) {
				let dependencies;
				
				//clone pour pas muter l'objet du state
				table = { ...table };
				children = unfilteredChildren[table.id].map(tableId => {
					return {
						tableId,
						isDisplay: true,
					};	
				});
				//delete les champs / sous-forms de la définition dépendant des field dependencies
				dependencies = parseDependencies(table, record);

				//fields on this table that might depend on the parent record's
				const { table: parentTable } = parentSchema;
				if (parentTable && parentRecord) {
					const parentDependencies = parseDependencies(parentTable, parentRecord);
					if (parentDependencies) {
						dependencies = dependencies || {};
						dependencies = {
							...parentDependencies,
							...dependencies,
						};
					}
				}

				if (dependencies) {
					// console.log(dependencies);
					table.fields = table.fields.map(field => {
						if (dependencies[field.id] === undefined) return field;
						//field depends on another?
						const { isDisplay, descriptionAppend, titleOverride } = dependencies[field.id];

						if (isDisplay) {
							//field description can have an append that is set by dependencies
							// console.log(descriptionAppend);
							return {
								...field,
								descriptionAppend,
								label: titleOverride || field.label,
							};
						}
						// console.log('field %s.%s hidden', table.name, field.name);
						return false;
					}).filter(field => field);
					
					//certains fields sont le rel field d'un sous-form, ce qui indique que ce sous-form doit s'afficher au non
					Object.keys(dependencies).forEach((targetFieldId) => {
						
						const field = allFields[targetFieldId];
						//pour indiquer si le subform s'affiche ou pas dépendant de la value, on se fie sur le champ foreign qui lie le subform à son parent. Les autres fields seront traités dans le subform, s'il s'affiche.
						if (field && field.foreign && field.foreign.foreignTableId === table.id) {
							//trouve ce child
							const child = children.find(candidate => candidate.tableId === field.table_id);
							child.isDisplay = dependencies[targetFieldId].isDisplay;
							child.titleOverride = dependencies[targetFieldId].titleOverride;
							child.descriptionAppend = dependencies[targetFieldId].descriptionAppend;
						}
					});
				}

				//enleve les children qui seront placés par un placeholder de la liste (qui sera loopée)
				children = children.map(child => {
					//détermine si ce subform est déplacé ailleurs par un placeholder
					child.hasPlaceholder = table && table.fields.find(field => field.subformPlaceholder === child.tableId);
					return child;
				});


				mainFields = createFieldGroups(table.fields.filter(f => !f.isSecondary));
				asideFields = createFieldGroups(table.fields.filter(f => f.isSecondary));

			}

			// console.log(tableSchema, records, recordId);
			return {
				record,
				recordUnaltered,
				children,
				table,
				env,
				mainFields,
				asideFields,
				...isGod,
			};
		}
	);
}


export function formRecordMapStateToProps() {
	const selectorInst = makeSelector(
		tableSchemaMapStateToProps(),
		recordMapStateToProps(),
		recordUnalteredMapStateToProps(),
		parentTableSchemaMapStateToProps(),
		parentRecordMapStateToProps(),
	);
	return (state, props) => {
		return selectorInst(state, props);
	};
}

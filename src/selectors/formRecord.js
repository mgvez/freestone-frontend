//SHARED

const fieldsSelector = state => state.freestone.schema.fields;
import { createSelector } from 'reselect';
import { tableSchemaMapStateToProps, parentTableSchemaMapStateToProps } from './tableSchema';
import { recordMapStateToProps, parentRecordMapStateToProps, recordUnalteredMapStateToProps } from './record';

// import { PRIKEY_ALIAS } from 'freestone/schemaProps';


// const recordsSelector = state => state.freestone.recordForm.records;
// const recordsUnalteredSelector = state => state.freestone.recordForm.recordsUnaltered;
const envSelector = state => state.freestone.env;
// const recordIdSelector = (state, props) => props.recordId;
const childrenSelector = state => state.freestone.schema.children;


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
				// console.log(rule.rule, record[controlFieldId]);

				carry[dependingFieldId].isDisplay = typeof carry[dependingFieldId].forceDisplay === 'undefined' ? rule.isDisplay : carry[dependingFieldId].forceDisplay;
				carry[dependingFieldId].descriptionAppend = carry[dependingFieldId].descriptionAppend + rule.descriptionAppend;
				carry[dependingFieldId].titleOverride = rule.titleOverride;
			}

			return carry;
		}, defaults);
	}, {});
	// console.log(dependenciesValues);

	return dependenciesValues;
}


function makeSelector(tableSchemaSelector, recordSelector, recordUnalteredSelector, parentTableSchemaSelector, parentRecordSelector) {
	return createSelector(
		[tableSchemaSelector, fieldsSelector, recordSelector, recordUnalteredSelector, childrenSelector, envSelector, parentTableSchemaSelector, parentRecordSelector],
		(schema, allFields, record, recordUnaltered, unfilteredChildren, env, parentSchema, parentRecord) => {
			let { table } = schema;
			let children;
			let dependencies;
			// const recordId = record && record[PRIKEY_ALIAS];
			// console.log(`build record for ${recordId}`, table && table.name);
			// console.log(formCollapsed);
			
			//some subforms are parsed in between fields through placeholders. If so, we don't replace them in remaining children loop, so we have to remove them from children
			if (table) {
				//clone pour pas muter l'objet du state
				table = { ...table };
				children = [...unfilteredChildren[table.id]];
				//delete les champs / sous-forms de la définition dépendant des field dependencies
				dependencies = parseDependencies(table, record);

				//fields on this table that might depend on the parent record's
				const { table: parentTable } = parentSchema;
				if (parentTable && parentRecord) {
					const parentDependencies = parseDependencies(parentTable, parentRecord);
					// console.log(parentSchema);
					// console.log(parentRecord);
					// console.log(dependencies);
					// console.log(parentDependencies);
					if (parentDependencies) {
						dependencies = dependencies || {};
						dependencies = {
							...parentDependencies,
							...dependencies,
						};
					}
				}


				// console.log(children);
				// console.log(allFields);
				if (dependencies) {
					table.fields = table.fields.map(field => {
						if (dependencies[field.id] === undefined) return field;
						//field depends on another?
						const { isDisplay, descriptionAppend, titleOverride } = dependencies[field.id];

						if (isDisplay) {
							//field description can have an append that is set by dependencies
							// console.log('DISPLAY', field.id);
							return {
								...field,
								descriptionAppend,
								label: titleOverride || field.label,
							};
						}
						return false;
					}).filter(field => field);
					//certains fields sont le rel field d'un sous-form, ce qui indique que ce sous-form doit s'afficher au non
					Object.keys(dependencies).forEach((targetFieldId) => {
						const isShow = dependencies[targetFieldId] && dependencies[targetFieldId].isDisplay;
						if (isShow) return;
						// console.log(targetFieldId, isShow);

						const field = allFields[targetFieldId];
						// console.log(field);
						//pour indiquer si le subform s'affiche ou pas dépendant de la value, on se fie sur le champ foreign qui lie le subform à son parent. Les autres fields seront traités dans le subform, s'il s'affiche.
						if (field.foreign && field.foreign.foreignTableId === table.id) {
							const subFormTableId = field.table_id;
							const idx = children.indexOf(subFormTableId);
							if (idx !== -1) children.splice(idx, 1);
						}
					});
				}

				children = table && table.fields.reduce((filteredChildren, field) => {
					if (field.subformPlaceholder) {
						// console.log(filteredChildren.indexOf(field.subformPlaceholder));
						const idx = filteredChildren.indexOf(field.subformPlaceholder);
						if (idx !== -1) filteredChildren.splice(idx, 1);
					}
					return filteredChildren;
				}, children);

				// console.log(table.fields);

			}


			// console.log(tableSchema, records, recordId);
			return {
				record,
				recordUnaltered,
				children,
				table,
				fields: table && table.fields,
				env,
				//passe les dependencies, pour les envoyer aux children, dont certains champs peuvent dépendre de la valeur du record parent
				dependencies,
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
		parentRecordMapStateToProps()
	);
	return (state, props) => {
		return selectorInst(state, props);
	};
}

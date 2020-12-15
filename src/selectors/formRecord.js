//SHARED

const fieldsSelector = state => state.freestone.schema.fields;
import md5 from 'md5';
import { createSelector } from 'reselect';
import { tableSchemaMapStateToProps, parentTableSchemaMapStateToProps } from './tableSchema';
import { recordMapStateToProps, parentRecordMapStateToProps, recordUnalteredMapStateToProps, activeGroupMapStateToProps } from './record';
import { isGodSelector } from './credentials';
import { isNew } from '../utils/UniqueId';
import { GUID_FIELD } from '../freestone/schemaProps';

const envSelector = state => state.freestone.env.freestone;
const childrenSelector = state => state.freestone.schema.children;
const tablesSelector = state => state.freestone.schema.tables;


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
					sizeOverride: undefined,
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
				// console.log(rule);

				carry[dependingFieldId].isDisplay = typeof carry[dependingFieldId].forceDisplay === 'undefined' ? rule.isDisplay : carry[dependingFieldId].forceDisplay;
				carry[dependingFieldId].descriptionAppend = (carry[dependingFieldId].descriptionAppend || '') + (rule.descriptionAppend || '');
				carry[dependingFieldId].titleOverride = rule.titleOverride;
				carry[dependingFieldId].sizeOverride = Number(rule.sizeOverride);
			}

			return carry;
		}, defaults);
	}, {});
	// console.log(dependenciesValues);

	return dependenciesValues;
}

//create groups according to separators
function createFieldGroups(fields, children) {
	const namedGroups = (fields || []).reduce((groups, curField) => {
		const isSeparator = curField.type === 'separator';
		const isPlaceholder = !!curField.subformPlaceholder;

		let curGroup = groups[groups.length - 1];
		//new group when separator, or when current or previous field was a subfrom placeholder. Placeholders are always alone in their group
		if (!curGroup || isSeparator) {
			// console.log('creating group', child, curField);
			curGroup = {
				label: (isSeparator && curField.label) || null,
				key: '',
				children: [],
				isFirst: !curGroup, //indicate of this group is the first one in list
				fields: [],
				asideFields: [],
			};
			groups.push(curGroup);
		}
		// console.log(curField);
		curGroup.key += `${curField.id}-`;

		// 	child.hasPlaceholder = table && table.fields.find(field => field.subformPlaceholder === child.tableId);
		const child = isPlaceholder && children && children.find(candidate => curField.subformPlaceholder === candidate.tableId);
		//if childform in placeholded, remove it from list of unplaced subforms
		if (child) {
			child.hasPlaceholder = true;
			curGroup.children.push(child);
		}

		if (!isSeparator && !isPlaceholder) {

			//only display displayable fields
			if (!~['pri', 'ajax', 'order'].indexOf(curField.type) && (!curField.foreign || !~['mtm'].indexOf(curField.foreign.type)) && !curField.isHidden) {
				//push field in aside field list OR main field list, depending on field config
				const holder = !curField.isSecondary ? curGroup.fields : curGroup.asideFields;
				holder.push(curField);
			}
		}
		return groups;
	}, []).map(gr => {
		gr.key = md5(gr.key);
		return gr;
	});

	if (!children) return namedGroups;
	//if there are children forms, add the remaining ones (without placeholders) to the list of form groups
	return children.reduce((groups, child) => {
		if (!child.hasPlaceholder) {
			const curGroup = {
				label: (child.label) || null,
				key: child.key,
				children: [child],
				asideFields: [],
				fields: [],
			};
			groups.push(curGroup);
		}
		return groups;
	}, namedGroups);

}

const parsedChildrenSelector = createSelector(
	[childrenSelector, tablesSelector],
	(children, tables) => {

		return Object.keys(children).reduce((carry, parentId) => {
			carry[parentId] = children[parentId].map(childId => {
				const childDef = tables && tables[childId];
				// console.log(childDef);
				return {
					tableId: childId,
					key: `child_${parentId}_${childId}`,
					label: childDef && childDef.displayLabel,
				};
			});
			return carry;
		}, {});
	}
);


function makeSelector(tableSchemaSelector, recordSelector, recordUnalteredSelector, parentTableSchemaSelector, parentRecordSelector, activeGroupSelector) {
	return createSelector(
		[tableSchemaSelector, fieldsSelector, recordSelector, recordUnalteredSelector, parsedChildrenSelector, envSelector, parentTableSchemaSelector, parentRecordSelector, isGodSelector, activeGroupSelector],
		(tableSchema, allFields, record, recordUnaltered, unfilteredChildren, env, parentTable, parentRecord, isGod, activeGroupKey) => {
			let children;
			let mainGroups;
			let activeGroup;
			let table;
			//some subforms are parsed in between fields through placeholders. If so, we don't replace them in remaining children loop, so we have to remove them from children
			if (tableSchema) {
				let dependencies;
				
				//clone pour pas muter l'objet du state
				table = { ...tableSchema };
				children = unfilteredChildren[table.id].map(desc => {
					return {
						...desc,
						isDisplay: true,
					};	
				});
				//delete les champs / sous-forms de la définition dépendant des field dependencies
				dependencies = parseDependencies(table, record);

				//fields on this table that might depend on the parent record's
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
						const { isDisplay, descriptionAppend, titleOverride, sizeOverride } = dependencies[field.id];

						if (isDisplay) {
							//field description can have an append that is set by dependencies
							// console.log(descriptionAppend);
							return {
								...field,
								descriptionAppend,
								label: titleOverride || field.label,
								size: sizeOverride || field.size,
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
							if (child) {
								child.isDisplay = dependencies[targetFieldId].isDisplay;
								child.titleOverride = dependencies[targetFieldId].titleOverride;
								child.sizeOverride = dependencies[targetFieldId].sizeOverride;
								child.descriptionAppend = dependencies[targetFieldId].descriptionAppend;
							}
						}
					});
				}

				mainGroups = createFieldGroups(table.fields, children).filter(g => g.children.length || g.fields.length || g.asideFields.length);
				// console.log(mainGroups);

				activeGroup = mainGroups.find(g => g.key === activeGroupKey) || mainGroups[0];

			}

			return {
				record,
				recordGUID: record && record[GUID_FIELD],
				isNew: isNew(record && record.prikey),
				recordUnaltered,
				table,
				env,
				mainGroups,
				activeGroup,
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
		activeGroupMapStateToProps(),
	);
	return (state, props) => {
		return selectorInst(state, props);
	};
}

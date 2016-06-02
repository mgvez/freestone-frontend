//SHARED

const fieldsSelector = state => state.schema.fields;
import { createSelector } from 'reselect';
import { tableSchemaMapStateToProps } from 'selectors/tableSchema';
import { recordMapStateToProps, recordUnalteredMapStateToProps } from 'selectors/record';
import { userViewLanguageSelector } from 'selectors/userViewLanguage';


// const recordsSelector = state => state.recordForm.records;
// const recordsUnalteredSelector = state => state.recordForm.recordsUnaltered;
const envSelector = state => state.env;
// const recordIdSelector = (state, props) => props.recordId;
const childrenSelector = state => state.schema.children;


function checkRule(rule, val) {
	const boolRule = rule.toUpperCase();
	
	if (boolRule === 'TRUE') {
		return !!val;
	} else if (boolRule === 'FALSE') {
		return !val;
	}
	
	//next tests only valid if field has value
	if (!val) return false;
	
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

function parseDependencies(table, record) {
	if (!record) return null;
	const { fieldDependencies } = table;
	const fieldIds = fieldDependencies && Object.keys(fieldDependencies);
	if (!fieldIds || fieldIds.length === 0) return null;
	// parsedTable.fields = [];
	// fieldIds
	const dependenciesValues = fieldIds.map((fieldId) => {
		const deps = fieldDependencies[fieldId];
		// console.log(record[id]);
		// console.log(id);
		// console.log(deps);
		return deps && deps.reduce((states, def) => {
			const ruleApplies = checkRule(def.rule, record[fieldId]);
			return def.deps.show.reduce((carry, targetFieldId) => {
				carry[targetFieldId] = ruleApplies;
				return carry;
			}, def.deps.hide.reduce((carry, targetFieldId) => {
				carry[targetFieldId] = !ruleApplies;
				return carry;
			}, states));
		}, {});
	}).reduce((carry, partial) => {
		return {
			...carry,
			...partial,
		};
	}, {});
	// console.log(dependenciesValues);

	return dependenciesValues;
}

function makeSelector(tableSchemaSelector, recordSelector, recordUnalteredSelector) {
	return createSelector(
		[tableSchemaSelector, fieldsSelector, recordSelector, recordUnalteredSelector, childrenSelector, envSelector, userViewLanguageSelector],
		(schema, allFields, record, recordUnaltered, unfilteredChildren, env, userViewLanguage) => {
			let { table } = schema;
			let children;
			const recordId = record && record.prikey;
			// console.log(`build record for ${recordId}`, table && table.name);
			// console.log(recordSelected, record);

			//some subforms are parsed in between fields through placeholders. If so, we don't replace them in remaining children loop, so we have to remove them from children
			if (table) {
				//clone pour pas muter l'objet du state
				table = { ...table };
				children = [...unfilteredChildren[table.id]];
				//delete les champs / sous-forms de la définition dépendant des field dependencies
				const dependencies = parseDependencies(table, record);
				// console.log(children);
				// console.log(allFields);
				if (dependencies) {
					table.fields = table.fields.filter(field => {
						//ce field dépend d'un autre?
						const dep = dependencies[field.id];
						return dep !== false;
					});
					//certains fields sont le rel field d'un sous-form, ce qui indique que ce sous-form doit s'afficher au non
					Object.keys(dependencies).forEach((targetFieldId) => {
						const isShow = dependencies[targetFieldId];
						if (isShow) return;
						const field = allFields[targetFieldId];
						const subFormTableId = field.table_id;
						const idx = children.indexOf(subFormTableId);
						if (idx !== -1) children.splice(idx, 1);
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

				
			}


			// console.log(tableSchema, records, recordId);
			return {
				record,
				recordUnaltered,
				children,
				table,
				fields: table && table.fields,
				env,
				...userViewLanguage,
			};
		}
	);
}


export function formRecordMapStateToProps() {
	const selectorInst = makeSelector(tableSchemaMapStateToProps(), recordMapStateToProps(), recordUnalteredMapStateToProps());
	return (state, props) => {
		return selectorInst(state, props);
	};
}

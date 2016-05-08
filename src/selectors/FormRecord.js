import { createSelector } from 'reselect';
import { tableSchemaSelector } from 'selectors/tableSchema';
import { userViewLanguageSelector } from 'selectors/userViewLanguage';


const recordsSelector = state => state.recordForm.records;
const envSelector = state => state.env;
const recordsUnalteredSelector = state => state.recordForm.recordsUnaltered;
const recordIdSelector = (state, props) => props.recordId;
const childrenSelector = state => state.schema.children;

export const formRecordSelector = createSelector(
	[tableSchemaSelector, recordsSelector, recordIdSelector, recordsUnalteredSelector, childrenSelector, envSelector, userViewLanguageSelector],
	(schema, records, recordId, recordsUnaltered, unfilteredChildren, env, userViewLanguage) => {
		// console.log(`build record for ${recordId}`);
		const { table } = schema;
		const record = recordId && table && records[table.id] && records[table.id][recordId];
		const recordUnaltered = recordId && table && recordsUnaltered[table.id] && recordsUnaltered[table.id][recordId];
		let children;

		//some subforms are parsed in between fields through placeholders. If so, we don't replace them in remaining children loop, so we have to remove them from children
		if (table) {
			children = table && table.fields.reduce((filteredChildren, field) => {
				if (field.subformPlaceholder) {
					// console.log(filteredChildren.indexOf(field.subformPlaceholder));
					filteredChildren.splice(filteredChildren.indexOf(field.subformPlaceholder), 1);
				}
				return filteredChildren;
			}, [...unfilteredChildren[table.id]]);
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

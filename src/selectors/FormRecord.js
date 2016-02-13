import { createSelector } from 'reselect';
import { tableSchemaSelector } from 'selectors/TableSchema';
import { foreignOptionsSelector } from 'selectors/ForeignOptions';

const recordsSelector = state => state.recordForm.records;
const recordsUnalteredSelector = state => state.recordForm.recordsUnaltered;
const recordIdSelector = (state, props) => props.recordId;
const childrenSelector = state => state.schema.children;


export const formRecordSelector = createSelector(
	[tableSchemaSelector, recordsSelector, recordsUnalteredSelector, recordIdSelector, childrenSelector, foreignOptionsSelector],
	(schema, records, recordsUnaltered, recordId, unfilteredChildren, foreignOptionsAll) => {
		// console.log(`build record for ${recordId}`);
		const { table } = schema;
		const record = recordId && table && records[table.id] && records[table.id][recordId];
		const recordUnaltered = recordId && table && recordsUnaltered[table.id] && recordsUnaltered[table.id][recordId];
		const children = table && unfilteredChildren[table.id];

		let foreignOptions;
		if (table) {
			foreignOptions = foreignOptionsAll;
		// 	foreignOptions = table.fields.map((field) => {
		// 		return foreignOptionsAll[field.id];
		// 	}).filter(options => options).reduce((carry, current) => {
		// 		carry[current.fieldId] = current;
		// 		return carry;
		// 	}, {});
		}
		// console.log(foreignOptions);
		// console.log(tableSchema, records, recordId);
		return {
			record,
			recordUnaltered,
			children,
			table,
			foreignOptions,
			fields: table && table.fields,
		};
	}
);

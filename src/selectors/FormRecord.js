import { createSelector } from 'reselect';
import { tableSchemaSelector } from 'selectors/TableSchema';
import { foreignOptionsSelector } from 'selectors/ForeignOptions';

const recordsSelector = state => state.recordForm.records;
const recordIdSelector = (state, props) => props.recordId;
const childrenSelector = state => state.schema.children;


export const formRecordSelector = createSelector(
	[tableSchemaSelector, recordsSelector, recordIdSelector, childrenSelector, foreignOptionsSelector],
	(schema, records, recordId, unfilteredChildren, foreignOptionsAll) => {
		// console.log(`build record for ${recordId}`);
		const { table } = schema;
		const record = recordId && table && records[table.name] && records[table.name][recordId];
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
			children,
			table,
			foreignOptions,
			fields: table && table.fields,
		};
	}
);

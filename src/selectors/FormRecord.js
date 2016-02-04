import { createSelector } from 'reselect';
import { tableSchemaSelector } from 'selectors/TableSchema';

const recordsSelector = state => state.recordForm.records;
const recordIdSelector = (state, props) => props.recordId;
const childrenSelector = state => state.schema.children;


export const formRecordSelector = createSelector(
	[tableSchemaSelector, recordsSelector, recordIdSelector, childrenSelector],
	(schema, records, recordId, unfilteredChildren) => {
		const { table } = schema;
		const record = recordId && table && records[table.name] && records[table.name][recordId];
		const children = table && unfilteredChildren[table.id];

		// console.log(tableSchema, records, recordId);
		return {
			record,
			children,
			table,
			fields: table && table.fields,
		};
	}
);

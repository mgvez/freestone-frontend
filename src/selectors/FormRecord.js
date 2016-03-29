import { createSelector } from 'reselect';
import { tableSchemaSelector } from 'selectors/TableSchema';

const recordsSelector = state => state.recordForm.records;
const envSelector = state => state.env;
const recordsUnalteredSelector = state => state.recordForm.recordsUnaltered;
const recordIdSelector = (state, props) => props.recordId;
const childrenSelector = state => state.schema.children;


export const formRecordSelector = createSelector(
	[tableSchemaSelector, recordsSelector, recordIdSelector, recordsUnalteredSelector, childrenSelector, envSelector],
	(schema, records, recordId, recordsUnaltered, unfilteredChildren, env) => {
		// console.log(`build record for ${recordId}`);
		const { table } = schema;
		const record = recordId && table && records[table.id] && records[table.id][recordId];
		const recordUnaltered = recordId && table && recordsUnaltered[table.id] && recordsUnaltered[table.id][recordId];
		const children = table && unfilteredChildren[table.id];

		// console.log(tableSchema, records, recordId);
		return {
			record,
			recordUnaltered,
			children,
			table,
			fields: table && table.fields,
			env,
		};
	}
);

import { createSelector } from 'reselect';
import { tableSchemaSelector } from 'selectors/TableSchema';

const recordsSelector = state => state.recordForm.records;
const recordIdSelector = (state, props) => props.params.recordId;

export const formRecordSelector = createSelector(
	[tableSchemaSelector, recordsSelector, recordIdSelector],
	(tableSchema, records, recordId) => {
		const { table } = tableSchema;
		// console.log(tableSchema, records, recordId);
		return recordId && table && records[table.name] && records[table.name][recordId];
	}
);

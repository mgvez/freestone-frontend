import { createSelector } from 'reselect';
import { tableSchemaSelector } from 'selectors/TableSchema';

const recordsSelector = state => state.recordList.records;
const recordsTableSelector = state => state.recordList.table;

export const listRecordsSelector = createSelector(
	[tableSchemaSelector, recordsSelector, recordsTableSelector],
	(schema, stateRecords, recordsTable) => {
		const { table } = schema;
		let records;
		if (table && recordsTable === table.name) {
			records = stateRecords;
		}
		return {
			table,
			searchableFields: table && table.searchableFields,
			records,
		};
	}
);

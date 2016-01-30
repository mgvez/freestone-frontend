import { createSelector } from 'reselect';
import { tableSchemaSelector } from 'selectors/TableSchema';

const recordsSelector = state => state.recordList.records;
const recordsTableSelector = state => state.recordList.table;

export const listRecordsSelector = createSelector(
	[tableSchemaSelector, recordsSelector, recordsTableSelector],
	(table, records, recordsTable) => {
		// console.log(table.name, recordsTable, records);
		if (table && recordsTable === table.name) {
			return records;
		}
		return null;
	}
);

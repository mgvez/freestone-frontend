import { createSelector } from 'reselect';
import { tableSchemaSelector } from 'selectors/TableSchema';

const recordsSelector = state => state.recordForm.records;
const recordsAreLoadedSelector = state => state.recordForm.childrenAreLoaded;
const parentRecordIdSelector = (state, props) => props.parentRecordId;

function getRecords(records, parentRecordId) {
	return Object.keys(records).map((recordId) => {
		const record = records[recordId];
		// console.log(record);
		return record.parentkey === parentRecordId && record;
	}).filter(record => record);
}

export const formChildrenRecordsSelector = createSelector(
	[tableSchemaSelector, recordsSelector, recordsAreLoadedSelector, parentRecordIdSelector],
	(tableSchema, records, recordsAreLoaded, parentRecordId) => {
		const { table } = tableSchema;
		const areLoaded = parentRecordId && table && recordsAreLoaded[table.name] && recordsAreLoaded[table.name][parentRecordId];
		// console.log(parentRecordId, table, recordsAreLoaded);
		const tableRecords = table && records[table.name];

		let childrenRecords;

		if (areLoaded) {
			childrenRecords = getRecords(tableRecords, parentRecordId);
		}

		// console.log(childrenRecords);
		return childrenRecords;
	}
);

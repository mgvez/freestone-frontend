import { createSelector } from 'reselect';
import { tableSchemaSelector } from 'selectors/TableSchema';

import { PARENTKEY_ALIAS } from 'freestone/SchemaProps';

const recordsSelector = state => state.recordForm.records;
const recordsAreLoadedSelector = state => state.recordForm.childrenAreLoaded;
const parentRecordIdSelector = (state, props) => props.parentRecordId;
const shownRecordsSelector = (state) => state.recordForm.shownRecords;

function getRecords(records, parentRecordId, prikey, searchableFields) {
	return Object.keys(records).map((recordId) => {
		const record = records[recordId];
		// console.log(record);
		return record[PARENTKEY_ALIAS] === parentRecordId && record;
	}).filter(record => record).map(record => {
		return {
			id: record[prikey.name],
			label: searchableFields.map(field => {
				return record[field.name];
			}).join(' '),
		};
	});
}

export const formChildrenRecordsSelector = createSelector(
	[tableSchemaSelector, recordsSelector, recordsAreLoadedSelector, parentRecordIdSelector, shownRecordsSelector],
	(schema, records, recordsAreLoaded, parentRecordId, shownRecords) => {
		
		const { table } = schema;
		const areLoaded = parentRecordId && table && recordsAreLoaded[table.id] && recordsAreLoaded[table.id][parentRecordId];
		// console.log(parentRecordId, table, recordsAreLoaded);
		const tableRecords = table && records[table.id];

		let childrenRecords;
		if (areLoaded) {
			childrenRecords = getRecords(tableRecords, parentRecordId, table.prikey, table.searchableFields);
		}

		const activeRecord = shownRecords && table && shownRecords[table.id] && (shownRecords[table.id][parentRecordId] || null);

		// console.log(activeRecord);
		return {
			table,
			childrenRecords,
			activeRecord,
		};
	}
);

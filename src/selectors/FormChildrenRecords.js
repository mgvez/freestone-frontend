import { createSelector } from 'reselect';
import { tableSchemaSelector } from 'selectors/TableSchema';

import { PARENTKEY_ALIAS, PRIKEY_ALIAS, DELETED_PSEUDOFIELD_ALIAS } from 'freestone/SchemaProps';
import { MAX_TAB_LABEL_LENGTH } from 'freestone/settings';


const recordsSelector = state => state.recordForm.records;
const childrenAreLoadedSelector = state => state.recordForm.childrenAreLoaded;
const parentRecordIdSelector = (state, props) => props.parentRecordId;
const parentTableIdSelector = (state, props) => props.parentTableId;
const shownRecordsSelector = (state) => state.recordForm.shownRecords;

function getRecords(records, parentRecordId, parentTableId, prikey, searchableFields, orderField) {
	let filtered = Object.keys(records).map((recordId) => {
		const record = records[recordId];
		// console.log(record);
		return (record[`${PARENTKEY_ALIAS}_${parentTableId}`] === parentRecordId && record[DELETED_PSEUDOFIELD_ALIAS] !== true) && record;
	}).filter(record => record);

	
	if (orderField) {
		filtered = filtered.sort((a, b) => {
			return a[orderField.id] - b[orderField.id];
		});
	}

	return filtered.map(record => {
		// console.log(record);
		let label = searchableFields.map(field => {
			return record[field.id];
		}).join(' ');

		if (label.length > MAX_TAB_LABEL_LENGTH) {
			label = label.substring(0, MAX_TAB_LABEL_LENGTH) + '...';
		}

		return {
			id: record[PRIKEY_ALIAS],
			order: orderField && record[orderField.id],
			label,
		};
	});
}

export const formChildrenRecordsSelector = createSelector(
	[tableSchemaSelector, recordsSelector, childrenAreLoadedSelector, parentRecordIdSelector, parentTableIdSelector, shownRecordsSelector],
	(schema, records, childrenAreLoaded, parentRecordId, parentTableId, shownRecords) => {
		
		const { table } = schema;
		const areLoaded = parentRecordId && table && childrenAreLoaded[parentTableId] && childrenAreLoaded[parentTableId][parentRecordId] && childrenAreLoaded[parentTableId][parentRecordId][table.id];
		// console.log(parentRecordId, table, childrenAreLoaded);
		const tableRecords = table && records[table.id];

		let childrenRecords;
		if (areLoaded) {
			childrenRecords = getRecords(tableRecords, parentRecordId, parentTableId, table.prikey, table.searchableFields, table.orderField);
		}

		const activeRecordId = shownRecords && table && shownRecords[table.id] && (shownRecords[table.id][parentRecordId] || null);

		const activeRecord = childrenRecords && (childrenRecords.find(rec => rec.id === activeRecordId) || childrenRecords[0]);

		// console.log(shownRecords);
		return {
			table,
			childrenRecords,
			activeRecord,
		};
	}
);

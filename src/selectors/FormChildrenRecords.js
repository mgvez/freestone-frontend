//SHARED

import { createSelector } from 'reselect';
import { tableSchemaMapStateToProps } from 'selectors/tableSchema';
import { tableRecordsMapStateToProps } from 'selectors/record';

import { PARENTKEY_ALIAS, PRIKEY_ALIAS, DELETED_PSEUDOFIELD_ALIAS } from 'freestone/schemaProps';
import { MAX_TAB_LABEL_LENGTH } from 'freestone/settings';

const childrenAreLoadedSelector = state => state.recordForm.childrenAreLoaded;
const shownRecordsSelector = (state) => state.recordForm.shownRecords;

const parentRecordIdSelector = (state, props) => props.parentRecordId;
const parentTableIdSelector = (state, props) => props.parentTableId;


function getRecordsFromParent(records, parentRecordId, parentTableId) {
	return Object.keys(records).map((recordId) => {
		const record = records[recordId];
		// console.log(record);
		return (record[`${PARENTKEY_ALIAS}_${parentTableId}`] === parentRecordId && record[DELETED_PSEUDOFIELD_ALIAS] !== true) && record;
	}).filter(record => record);
}

function sortRecords(records, orderField) {
	if (orderField) {
		return records.sort((a, b) => {
			return a[orderField.id] - b[orderField.id];
		});
	}
	return records;
}

function getLabeledRecords(records, searchableFields, orderField) {

	return sortRecords(records, orderField).map(record => {
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

function makeSelector(tableSchemaSelector, tableRecordsSelector) {
	return createSelector(
		[tableSchemaSelector, tableRecordsSelector, childrenAreLoadedSelector, parentRecordIdSelector, parentTableIdSelector, shownRecordsSelector],
		(schema, tableRecords, childrenAreLoaded, parentRecordId, parentTableId, shownRecords) => {
			const { table } = schema;
			if (table) {
				const areLoaded = parentRecordId && childrenAreLoaded[parentTableId] && childrenAreLoaded[parentTableId][parentRecordId] && childrenAreLoaded[parentTableId][parentRecordId][table.id];
				// console.log(parentRecordId, table, areLoaded);
				const parentLinkField = table.parentLink[parentTableId];

				const type = parentLinkField && parentLinkField.type;
				let activeRecordId;
				let activeRecord;

				let childrenRecords;
				if (areLoaded) {
					childrenRecords = getRecordsFromParent(tableRecords, parentRecordId, parentTableId);
					childrenRecords = getLabeledRecords(childrenRecords, table.searchableFields, table.orderField);

					activeRecordId = shownRecords && shownRecords[table.id] && (shownRecords[table.id][parentRecordId] || null);
					activeRecord = childrenRecords && (childrenRecords.find(rec => rec.id === activeRecordId) || childrenRecords[0]);
				}

				//highest order, pour quand on add un record, qu'il soit à la suite
				let highestOrder = 0;
				if (table.orderField && childrenRecords) {
					highestOrder = childrenRecords.reduce((highest, record) => {
						return record.order > highest ? Number(record.order) : highest;
					}, 0);
				}

				return {
					table,
					highestOrder,
					type,
					childrenRecords,
					activeRecord,
				};
			}

			return {};

		}
	);
}

export function formChildrenRecordsMapStateToProps() {
	const selectorInst = makeSelector(tableSchemaMapStateToProps(), tableRecordsMapStateToProps());
	return (state, props) => {
		return selectorInst(state, props);
	};
}

import { createSelector } from 'reselect';
import { tableSchemaSelector } from 'selectors/tableSchema';

const allMtmOptionsSelector = state => state.mtmOptions;
const recordsSelector = state => state.recordForm.records;
const childrenAreLoadedSelector = state => state.recordForm.childrenAreLoaded;
const childrenRecordsSelector = (state, props) => props.childrenRecords;

const tableIdSelector = (state, props) => props.table && props.table.id;
const parentRecordIdSelector = (state, props) => props.parentRecordId;
const parentTableIdSelector = (state, props) => props.parentTableId;


function getMtmRecords(records, mtmOptionField) {
	return records.map(record => {
		return record[mtmOptionField.id];
	});
}

export const mtmFormSelector = createSelector(
	[tableSchemaSelector, allMtmOptionsSelector, tableIdSelector, parentTableIdSelector, parentRecordIdSelector, childrenAreLoadedSelector, recordsSelector, childrenRecordsSelector],
	(schema, allMtmOptions, tableId, parentTableId, parentRecordId, childrenAreLoaded, allRecords, childrenRecords) => {
		
		const { table } = schema;

		let mtmOptions;
		let records;

		if (table) {
			const areLoaded = parentRecordId && childrenAreLoaded[parentTableId] && childrenAreLoaded[parentTableId][parentRecordId] && childrenAreLoaded[parentTableId][parentRecordId][table.id];

			// console.log(table.id);
			// console.log(allRecords[table.id]);
			// console.log(allMtmOptions);
			mtmOptions = allMtmOptions[table.id];

			if (areLoaded) {
				records = (allRecords[table.id] && allRecords[table.id][parentTableId] && allRecords[table.id][parentTableId][parentRecordId]) || [];
			}

		}
		return {
			mtmOptions,
			records,
			table,
		};
	}
);

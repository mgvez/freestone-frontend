//SHARED

import { createSelector } from 'reselect';
import { tableSchemaMapStateToProps } from './tableSchema';

const allMtmOptionsSelector = state => state.freestone.foreign.mtm;
const recordsSelector = state => state.freestone.recordForm.mtmRecords;
const childrenAreLoadedSelector = state => state.freestone.recordForm.childrenAreLoaded;

const tableIdSelector = (state, props) => props.table && props.table.id;
const parentRecordIdSelector = (state, props) => props.parentRecordId;
const parentTableIdSelector = (state, props) => props.parentTableId;

function makeSelector(tableSchemaSelector) {
	return createSelector(
		[tableSchemaSelector, allMtmOptionsSelector, tableIdSelector, parentTableIdSelector, parentRecordIdSelector, childrenAreLoadedSelector, recordsSelector],
		(schema, allMtmOptions, tableId, parentTableId, parentRecordId, childrenAreLoaded, allRecords) => {
			
			const { table } = schema;

			let mtmOptions;
			let records;

			if (table) {
				const areLoaded = parentRecordId && childrenAreLoaded[parentTableId] && childrenAreLoaded[parentTableId][parentRecordId] && childrenAreLoaded[parentTableId][parentRecordId][table.id];

				// console.log(areLoaded);
				// console.log(allRecords[table.id]);
				// console.log(allMtmOptions);
				mtmOptions = allMtmOptions[table.id];

				if (areLoaded) {
					records = (allRecords[table.id] && allRecords[table.id][parentTableId] && allRecords[table.id][parentTableId][parentRecordId]) || [];
				}
				// console.log(records);
			}
			return {
				mtmOptions,
				records,
				table,
			};
		}
	);
}

export function formMtmMapStateToProps() {
	const selectorInst = makeSelector(tableSchemaMapStateToProps());
	return (state, props) => {
		return selectorInst(state, props);
	};
}

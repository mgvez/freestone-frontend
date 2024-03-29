//SHARED

import { createSelector } from 'reselect';
import { tableSchemaMapStateToProps, genericTableIdSelector } from './tableSchema';

const allMtmOptionsSelector = state => state.freestone.foreign.mtm;
const recordsSelector = state => state.freestone.recordForm.mtmRecords;
const childrenAreLoadedSelector = state => state.freestone.recordForm.childrenAreLoaded;

const parentRecordIdSelector = (state, props) => props.parentRecordId;
const parentTableIdSelector = (state, props) => props.parentTableId;

function makeSelector(tableSchemaSelector) {
	return createSelector(
		[tableSchemaSelector, allMtmOptionsSelector, genericTableIdSelector, parentTableIdSelector, parentRecordIdSelector, childrenAreLoadedSelector, recordsSelector],
		(table, allMtmOptions, tableId, parentTableId, parentRecordId, childrenAreLoaded, allRecords) => {

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

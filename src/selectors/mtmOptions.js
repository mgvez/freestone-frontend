import { createSelector } from 'reselect';

const allMtmOptionsSelector = state => state.mtmOptions;
const recordsSelector = state => state.recordForm.records;
const childrenRecordsSelector = (state, props) => props.childrenRecords;
const tableIdSelector = (state, props) => props.table && props.table.id;

export const mtmOptionsSelector = createSelector(
	[allMtmOptionsSelector, tableIdSelector, recordsSelector, childrenRecordsSelector],
	(allMtmOptions, tableId, records, childrenRecords) => {
		// console.log(allMtmOptions, tableId);
		// console.log(childrenRecords);
		// console.log(records[tableId]);
		return {
			mtmOptions: allMtmOptions[tableId],
		};
	}
);

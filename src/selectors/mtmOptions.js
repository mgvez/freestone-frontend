import { createSelector } from 'reselect';

const allMtmOptionsSelector = state => state.mtmOptions;
const tableIdSelector = (state, props) => props.table && props.table.id;

export const mtmOptionsSelector = createSelector(
	[allMtmOptionsSelector, tableIdSelector],
	(allMtmOptions, tableId) => {
		console.log(allMtmOptions, tableId);
		console.log(allMtmOptions[tableId]);
		return {
			mtmOptions: allMtmOptions[tableId],
		};
	}
);

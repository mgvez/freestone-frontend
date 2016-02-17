import { createSelector } from 'reselect';

import { saveRecordSelector } from 'selectors/BuildRecordForSave';

const saveStateSelector = state => state.save;

export const saveSelector = createSelector(
	[saveRecordSelector, saveStateSelector],
	(saveRecord, saveState) => {
		
		return {
			...saveRecord,
			saveState,
		};
	},
);

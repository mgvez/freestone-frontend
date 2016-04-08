import { createSelector } from 'reselect';

import { saveRecordSelector } from 'selectors/buildRecordForSave';
import { navBackSelector } from 'selectors/navBack';

const saveStateSelector = state => state.save;

export const saveSelector = createSelector(
	[saveRecordSelector, saveStateSelector, navBackSelector],
	(saveRecord, saveState, navBack) => {
		
		return {
			...navBack,
			...saveRecord,
			saveState,
		};
	},
);

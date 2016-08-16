import { createSelector } from 'reselect';
import { schemaSelector } from 'selectors/schema';

import { TYPE_MAIN } from 'freestone/schemaProps';

const recordsSelector = state => state.recordForm.records;
const toggleLoadedRecordsSelector = state => state.siteHeader.loaded_records_visibility;

export const loadedRecordsStatusSelector = createSelector(
	[schemaSelector, recordsSelector, toggleLoadedRecordsSelector],
	(schema, allRecords, loaded_records_visibility) => {
		const tableIds = Object.keys(allRecords);

		const nLoadedRecords = tableIds.reduce((num, tableId) => {
			const table = schema.tables[tableId];
			if (table && table.type === TYPE_MAIN) {
				return num + Object.keys(allRecords[tableId]).length;
			}
			return num;
		}, 0);

		return {
			nLoadedRecords,
			loaded_records_visibility,
		};
	}
);

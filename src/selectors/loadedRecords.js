import { createSelector } from 'reselect';
import { schemaSelector } from './schema';
import { allForeignOptionsSelector } from './foreignOptions';
import { getUnloadedOptions, getRecordLabel } from './recordLabel';

import { TYPE_MAIN, PRIKEY_ALIAS, LOADED_TIME_ALIAS } from '../freestone/schemaProps';
import { RECORD_LOADED_SAFE_LIFE } from '../freestone/settings';

const recordsSelector = state => state.freestone.recordForm.records;
const toggleLoadedRecordsSelector = state => state.freestone.siteHeader.loaded_records_visibility;

export const loadedRecords = createSelector(
	[schemaSelector, recordsSelector, allForeignOptionsSelector, toggleLoadedRecordsSelector],
	(schema, allRecords, allForeignOptions, visible) => {
		const tableIds = Object.keys(allRecords);
		let unloadedForeignOptions = [];
		const now = new Date().getTime() / 1000;

		const recordsByTable = tableIds.map(tableId => {
			// console.log(tableId);
			const table = schema.tables[tableId];
			let records;
			if (table && table.type === TYPE_MAIN) {

				unloadedForeignOptions = unloadedForeignOptions.concat(getUnloadedOptions(table, allForeignOptions));

				const recordIds = Object.keys(allRecords[tableId]);
				records = recordIds.map(recordId => {
					const rec = allRecords[tableId][recordId];
					const label = getRecordLabel(rec, table, allForeignOptions);
					// console.log(`${table.displayLabel} - ${label}`);

					const hasBeenOpenedFor = Math.round(now - rec[LOADED_TIME_ALIAS]);
					const isOutdated = hasBeenOpenedFor > RECORD_LOADED_SAFE_LIFE;

					return {
						label,
						id: rec[PRIKEY_ALIAS],
						isOutdated,
						hasBeenOpenedFor,
					};
				});

			}

			return {
				tableId,
				table,
				records,
			};

		});
		// console.log(unloadedForeignOptions);
		return {
			records: recordsByTable,
			unloadedForeignOptions,
			visible,
		};
	}
);

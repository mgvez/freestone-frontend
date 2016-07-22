import { createSelector } from 'reselect';
import { schemaSelector } from 'selectors/schema';
import { allForeignOptionsSelector } from 'selectors/foreignOptions';

import { TYPE_MAIN, PRIKEY_ALIAS, LOADED_TIME_ALIAS } from 'freestone/schemaProps';
import { RECORD_LOADED_SAFE_LIFE } from 'freestone/settings';

const recordsSelector = state => state.recordForm.records;
const toggleLoadedRecordsSelector = state => state.siteHeader.toggleLoadedRecords.loaded_records_visibility;

export const loadedRecords = createSelector(
	[schemaSelector, recordsSelector, allForeignOptionsSelector, toggleLoadedRecordsSelector],
	(schema, allRecords, allForeignOptions, visible) => {
		// console.log(schema);
		const tableIds = Object.keys(allRecords);
		const unloadedForeignOptions = [];
		const now = new Date().getTime() / 1000;

		const recordsByTable = tableIds.map(tableId => {
			// console.log(tableId);
			const table = schema.tables[tableId];
			let records;
			if (table && table.type === TYPE_MAIN) {

				const searchableFields = table.fields.filter(field => field.isLabel);

				const recordIds = Object.keys(allRecords[tableId]);
				records = recordIds.map(recordId => {
					const rec = allRecords[tableId][recordId];
					// console.log(rec);
					const label = searchableFields.map(field => {
						const val = rec[field.id];
						// console.log(field);
						if (field.foreign) {
							const foreignValues = allForeignOptions[field.id];
							if (!foreignValues) {
								unloadedForeignOptions.push(field.id);
								return val;
							}
							// console.log(typeof val, val);
							const foreignRec = foreignValues.values.find(foreignValue => {
								// console.log(foreignValue);
								return foreignValue.value === val;
							});
							return foreignRec && foreignRec.label;
						}

						return val;
					}).join(' | ');
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
		// console.log(recordsByTable);
		return {
			records: recordsByTable,
			unloadedForeignOptions,
			visible,
		};
	}
);

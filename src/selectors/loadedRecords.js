import { createSelector } from 'reselect';
import { schemaSelector } from 'selectors/schema';
import { allForeignOptionsSelector } from 'selectors/foreignOptions';

import { TYPE_MAIN, PRIKEY_ALIAS } from 'freestone/schemaProps';

const recordsSelector = state => state.recordForm.records;

export const loadedRecords = createSelector(
	[schemaSelector, recordsSelector, allForeignOptionsSelector],
	(schema, allRecords, allForeignOptions) => {
		// console.log(schema);
		const tableIds = Object.keys(allRecords);
		const unloadedForeignOptions = [];

		const recordsByTable = tableIds.map(tableId => {
			// console.log(tableId);
			const table = schema.tables[tableId];
			let records;
			if (table && table.type === TYPE_MAIN) {

				const searchableFields = table.fields.filter(field => field.isSearch);

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

					return {
						label,
						id: rec[PRIKEY_ALIAS],
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
		};
	}
);
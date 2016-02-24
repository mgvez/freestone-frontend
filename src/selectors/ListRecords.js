import { createSelector } from 'reselect';
import { tableSchemaSelector } from 'selectors/TableSchema';

const recordsSelector = state => state.recordList.records;
const envSelector = state => state.env;
const recordsTableSelector = state => state.recordList.table;

export const listRecordsSelector = createSelector(
	[tableSchemaSelector, recordsSelector, recordsTableSelector, envSelector],
	(schema, stateRecords, recordsTable, env) => {
		const { table } = schema;
		let records = stateRecords;
		let groupedRecords;
		if (table && recordsTable === table.name) {

			//build le breadcrumb des records en tree
			if (table.isSelfTree) {
				const levels = [];
				records = stateRecords.map((record) => {
					const level = Number(record.level) || 0;
					levels[level] = (levels[level] || 0) + 1;
					levels.length = level + 1;
					record.breadcrumb = levels.join('.');
					return record;
				});
			} else if (table.groupField) {
				const groupFieldAlias = table.groupField.alias;
				const groupFieldLabelAlias = table.groupField.listAlias;
				groupedRecords = records.reduce((carry, record) => {
					const groupVal = record[groupFieldAlias];
					let group = carry.find(candidate => candidate.val === groupVal);
					if (!group) {
						group = {
							label: record[groupFieldLabelAlias],
							val: groupVal,
							records: [],
						};
						carry.push(group);
					}
					group.records.push(record);
					return carry;
				}, []);
			}

			if (!groupedRecords) {
				groupedRecords = [
					{ records },
				];
			}

		}
		return {
			env,
			table,
			searchableFields: table && table.searchableFields,
			groupedRecords,
		};
	}
);

import { createSelector } from 'reselect';
import { tableSchemaSelector } from 'selectors/tableSchema';
import { getRecordLabel } from 'selectors/recordLabel';

import { PRIKEY_ALIAS, LABEL_PSEUDOFIELD_ALIAS, TYPE_BOOL } from 'freestone/schemaProps';

const recordsSelector = state => state.recordList;
const paramsSelector = (state, props) => props.params;

function flatten(records, flat = [], breadcrumb = [], level = 0) {
	if (!records) return flat;
	// console.log(level);
	const nextLevel = level + 1;
	return records.reduce((carry, item, idx) => {
		breadcrumb.length = level;
		breadcrumb[level] = idx + 1;
		item.breadcrumb = breadcrumb.join('.');
		const children = item.children;
		delete item.children;
		carry.push(item);
		return flatten(children, carry, breadcrumb, nextLevel);
	}, flat);
}

function reorderSelfTree(records) {
	const copy = records.map(r => { return { ...r }; });
	const tree = copy.reduce((carry, item) => {
		const parentId = Number(item.parent);
		const parentRecord = copy.find(record => Number(record[PRIKEY_ALIAS]) === parentId);

		if (!parentId || !parentRecord) {
			carry.push(item);
		} else {
			parentRecord.children = parentRecord.children || [];
			parentRecord.children.push(item);
		}
		return carry;
	}, []);
	return flatten(tree);
}

export const listRecordsSelector = createSelector(
	[tableSchemaSelector, recordsSelector, paramsSelector],
	(schema, stateRecords, params) => {

		const { records: loadedRecords, table: recordsTable, nRecords, search: providedSearch, pageSize, page: providedPage } = stateRecords;
		const { page: requestedPage, search: requestedSearch } = params;

		const nPages = Math.ceil(nRecords / pageSize);

		const { table } = schema;

		let groupedRecords;

		// console.log(table + ' && ' + recordsTable + '===' + table.name + ' && ' + providedPage + '===' + requestedPage + ' && ' + providedSearch + '===' + requestedSearch);
		if (table && recordsTable === table.name && Number(providedPage) === Number(requestedPage || 1) && providedSearch === (requestedSearch || '')) {
			let records = loadedRecords.map(record => {
				record[LABEL_PSEUDOFIELD_ALIAS] = getRecordLabel(record, table);
				return record;
			});

			if (table.isSelfTree) {
				//le tree ne peut pas etre construit direct en SQL, a cause de l'ordre, et au lieu de le builder en php, on le fait en js
				records = reorderSelfTree(loadedRecords);
			} else if (table.groupField) {
				console.log(table.groupField);
				const groupFieldAlias = table.groupField.alias;
				const groupFieldLabelAlias = table.groupField.listAlias;
				groupedRecords = records.reduce((carry, record) => {
					const groupVal = record[groupFieldAlias];
					let group = carry.find(candidate => candidate.val === groupVal);
					if (!group) {
						let groupValue = record[groupFieldLabelAlias];
						if (table.groupField.type === TYPE_BOOL) groupValue = Number(groupValue) ? 'true' : 'false';
						group = {
							label: `${table.groupField.label} - ${groupValue}`,
							val: groupVal,
							records: [],
						};
						carry.push(group);
					}
					group.records.push(record);
					return carry;
				}, []);
			}

			if (!groupedRecords && records) {
				groupedRecords = [
					{ records },
				];
			}
		}
		return {
			table,
			searchableFields: table && table.searchableFields,
			groupedRecords,
			curPage: providedPage,
			nPages,
			nRecords,
			search: providedSearch,
			qstr: stateRecords.qstr,
		};
	}
);

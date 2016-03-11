import { createSelector } from 'reselect';
import { tableSchemaSelector } from 'selectors/TableSchema';

const recordsSelector = state => state.recordList;
const envSelector = state => state.env;
const paramsSelector = (state, props) => props.params;
const locationSelector = (state, props) => props.location;

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
		const parentRecord = copy.find(record => Number(record.prikey) === parentId);

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
	[tableSchemaSelector, recordsSelector, paramsSelector, locationSelector, envSelector],
	(schema, stateRecords, params, location, env) => {

		const { records: loadedRecords, table: recordsTable, nRecords, search: providedSearch, pageSize, page: providedPage } = stateRecords;
		let { page: requestedPage } = params;
		requestedPage = requestedPage || 1;
		const { query } = location;
		const requestedSearch = (query && query.search) || '';

		const nPages = Math.ceil(nRecords / pageSize);

		const { table } = schema;
		let records = loadedRecords;
		let groupedRecords;

		// console.log(table + ' && ' + recordsTable + '===' + table.name + ' && ' + providedPage + '===' + requestedPage + ' && ' + providedSearch + '===' + requestedSearch);
		if (table && recordsTable === table.name && Number(providedPage) === Number(requestedPage) && providedSearch === requestedSearch) {

			if (table.isSelfTree) {
				//le tree ne peut pas etre construit direct en SQL, a cause de l'ordre, et au lieu de le builder en php, on le fait en js
				records = reorderSelfTree(loadedRecords);
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

			if (!groupedRecords && records) {
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
			curPage: providedPage,
			nPages,
			nRecords,
			search: providedSearch,
		};
	}
);

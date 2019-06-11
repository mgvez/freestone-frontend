import { createSelector } from 'reselect';
import { tableSchemaSelector } from './tableSchema';
import { getRecordLabel } from './recordLabel';

import { PRIKEY_ALIAS, LABEL_PSEUDOFIELD_ALIAS, TYPE_BOOL } from '../freestone/schemaProps';

const recordsSelector = state => state.freestone.recordList;
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

		const { 
			records: loadedRecords,
			table: recordsTable,
			search: providedSearch,
			filter: providedFilter,
			page: providedPage,
			order: providedOrder,
			pageSize,
			nRecords,
			swappedRecords,
			canAdd,
			invalidated,
		} = stateRecords;
		const { page: requestedPage, search: requestedSearch, order: requestedOrder, filter: requestedFilter } = params;

		const nPages = Math.ceil(nRecords / pageSize);

		const { table } = schema;

		let groupedRecords;

		// console.log(table + ' && ' + recordsTable + '===' + table.name + ' && ' + providedPage + '===' + requestedPage + ' && ' + providedSearch + '===' + requestedSearch);
		const isSameTable = table && recordsTable === table.name;
		const isSameSearch = providedSearch === (requestedSearch || '');
		const isSameFilter = (providedFilter || '') === (requestedFilter || '');
		const isSamePage = Number(providedPage) === Number(requestedPage || 1);
		const isSameOrder = Number(providedOrder || 0) === Number(requestedOrder || 0);

		const needsFetch = invalidated || !(isSameTable && isSamePage && isSameSearch && isSameOrder && isSameFilter);
		// console.log(isSameTable, isSamePage, isSameSearch, isSameOrder, isSameFilter);
		// console.log(needsFetch, table, loadedRecords);

		if (table && loadedRecords) {
			let records = loadedRecords.map(rawrecord => {
				const record = { ...rawrecord };
				//creates a label field, if not set by the backend
				if (!record[LABEL_PSEUDOFIELD_ALIAS]) record[LABEL_PSEUDOFIELD_ALIAS] = getRecordLabel(record, table);
				return record;
			});

			if (table.isSelfTree) {
				//le tree ne peut pas etre construit direct en SQL, a cause de l'ordre, et au lieu de le builder en php, on le fait en js
				records = reorderSelfTree(loadedRecords);
			} else if (table.groupField) {
				// console.log(table.groupField);
				const groupFieldAlias = table.groupField.alias;
				const groupFieldLabelAlias = table.groupField.listAlias;
				groupedRecords = records.reduce((carry, record) => {
					const groupVal = record[groupFieldAlias];
					// console.log(groupVal);
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
			needsFetch,
			search: providedSearch,
			qstr: stateRecords.qstr,
			canAdd,
			swappedRecords,
		};
	}
);


export function getListLink(params, page, search, filter, order) {
	// console.log(filter);

	const nextParams = [];

	if (page && Number(page) !== 1) nextParams.push(`page=${page}`);

	//if we explicitely filter, we clear search. Filters come before search.
	if (filter) {
		const qstrFilters = Object.keys(filter).map((filterKey) => {
			const val = filter[filterKey];
			if (val === null) return null;
			return `${filterKey}=${val}`;
		}).filter(a => a).join(',');
		if (qstrFilters) nextParams.push(`filter=${qstrFilters}`);
	} else if (search) {
		nextParams.push(`search=${search}`);
	} else {
		if (params.filter) nextParams.push(`filter=${params.filter}`);
		if (params.search && search === null) nextParams.push(`search=${params.search}`);
	}

	const currentOrder = Number(params.order || 0);
	let nextOrder = order;
	if (Math.abs(currentOrder) === Math.abs(order)) {
		nextOrder = currentOrder > 0 ? -currentOrder : 0;
	}
	// console.log(field.type);

	if (nextOrder) nextParams.push(`order=${nextOrder}`);

	return {
		to: `/list/${params.tableName}?${nextParams.join('&')}`,
	};
}

const pageSelector = (state, props) => props.page;
const searchSelector = (state, props) => props.search;
const filterSelector = (state, props) => props.filter;
const orderSelector = (state, props) => props.order;
export const getListLinkSelector = createSelector(
	[paramsSelector, pageSelector, searchSelector, filterSelector, orderSelector],
	getListLink,
);

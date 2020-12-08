import { createSelector } from 'reselect';
import { tableSchemaSelector, tableNameSelector } from './tableSchema';

import { getRecordLabel } from './recordLabel';
import { searchParamsSelector } from './route';
import { makeRecordQuickeditMapStateToProps } from './record';

import { PRIKEY_ALIAS, LABEL_PSEUDOFIELD_ALIAS, TYPE_BOOL } from '../freestone/schemaProps';

const stateRecordsSelector = state => state.freestone.recordList;
// const recordsQuickeditSelector = state => state.freestone.recordQuickedit;

const fieldSelector = (state, props) => props.field;
const recordIdSelector = (state, props) => props.recordId;


function makeQuickeditValSelector() {
	return createSelector(
		[makeRecordQuickeditMapStateToProps(), fieldSelector, recordIdSelector],
		(recordsQuickedit, field, recordId) => {
			const { id: field_id } = field;
			const editedVal = recordsQuickedit && recordsQuickedit[recordId] && recordsQuickedit[recordId][field_id];
			return {
				editedVal,
			};
		}
	);
}

export function quickeditFieldMapStateToProps() {
	const selectorInst = makeQuickeditValSelector();
	return (state, props) => {
		return selectorInst(state, props);
	};
}

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
	[tableNameSelector, tableSchemaSelector, stateRecordsSelector, searchParamsSelector, makeRecordQuickeditMapStateToProps()],
	(tableName, schema, stateRecords, searchParams, recordsQuickedit) => {
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
		const { page: requestedPage, search: requestedSearch, order: requestedOrder, filter: requestedFilter } = searchParams;

		const nPages = Math.ceil(nRecords / pageSize);

		const { table } = schema;

		let groupedRecords;

		// console.log(table + ' && ' + recordsTable + '===' + table.name + ' && ' + providedPage + '===' + requestedPage + ' && ' + providedSearch + '===' + requestedSearch);
		const isSameTable = recordsTable === tableName;
		const isSameSearch = providedSearch === (requestedSearch || '');
		const isSameFilter = (providedFilter || '') === (requestedFilter || '');
		const isSamePage = Number(providedPage) === Number(requestedPage || 1);
		const isSameOrder = Number(providedOrder || 0) === Number(requestedOrder || 0);

		const needsFetch = invalidated || !(isSameTable && isSamePage && isSameSearch && isSameOrder && isSameFilter);
		// console.log(isSameTable, isSamePage, isSameSearch, isSameOrder, isSameFilter);
		// console.log(needsFetch, table, loadedRecords);

		if (table && loadedRecords && isSameTable) {
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
							label: groupValue ? `${table.groupField.label} - ${groupValue}` : null,
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
			tableName,
			table,
			searchableFields: table && table.searchableFields,
			batchEditableFields: table && table.batchEditableFields,
			groupedRecords,
			curPage: providedPage,
			nPages,
			nRecords,
			needsFetch,
			search: providedSearch,
			qstr: stateRecords.qstr,
			canAdd,
			params: {
				...searchParams,
			},
			swappedRecords,
			isQuickedited: !!recordsQuickedit,
		};
	}
);


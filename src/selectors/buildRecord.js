import { createSelector } from 'reselect';
import { tableSchemaSelector } from 'selectors/tableSchema';
import { schemaSelector } from 'selectors/schema';
import { getForeignFieldId } from 'freestone/schemaHelpers';

import { PRIKEY_ALIAS, DELETED_PSEUDOFIELD_ALIAS, TYPE_MTM } from 'freestone/schemaProps';

const recordsSelector = state => state.recordForm.records;
const mtmRecordsSelector = state => state.recordForm.mtmRecords;
const recordIdSelector = (state, props) => props.recordId;
const childrenSelector = state => state.schema.children;

const saveStateSelector = state => state.save;

function getChildrenRecordIds(records, parentRecordId, linkFieldId) {
	// console.log(records, parentRecordId);
	return linkFieldId && records && Object.keys(records).map((recordId) => {
		const record = records[recordId];
		// console.log(record);
		return record[linkFieldId] === parentRecordId && record;
	}).filter(
		record => record
	).map(
		record => record[PRIKEY_ALIAS]
	);
}

//get un tree de IDs de records et de ses children
function buildTree(tableId, recordId, allRecords, allMtmRecords, allTables, unfilteredChildren) {
	const childrenTables = unfilteredChildren[tableId] || [];
	// children = 
	// console.log(childrenTables, tableId);
	const children = childrenTables.reduce((allChildrenRecords, childTableId) => {
		// console.log('table %s is child of %s', childTableId, tableId);

		if (allTables[childTableId] && allTables[childTableId].type === TYPE_MTM) {
			const thisMtm = (allMtmRecords[childTableId] && allMtmRecords[childTableId][tableId] && allMtmRecords[childTableId][tableId][recordId]) || [];

			allChildrenRecords.mtmChildren.push({
				tableId: childTableId,
				records: thisMtm,
			});
			
		} else {
			const subformFieldId = getForeignFieldId(childTableId, tableId, allTables);
			const childrenRecordIds = getChildrenRecordIds(allRecords[childTableId], recordId, subformFieldId);
			const childrenRecords = childrenRecordIds && childrenRecordIds.map(childRecId => {
				return buildTree(childTableId, childRecId, allRecords, allMtmRecords, allTables, unfilteredChildren);
			});
			
			if (childrenRecords) {
				allChildrenRecords.children = allChildrenRecords.children.concat(childrenRecords);
			}
		}

		return allChildrenRecords;
	}, { children: [], mtmChildren: [] });
	// console.log(children);
	const branch = {
		recordId,
		tableId,
		...children,
	};
	return branch;
}

//utilise le tree pour retriever les records référencés dans ce tree
function getRecords(branch, allRecords, getDeleted, records = {}) {
	const { tableId, recordId, children } = branch;
	const record = allRecords[tableId] && allRecords[tableId][recordId];
	records[tableId] = records[tableId] || {};

	if (record && ((getDeleted && record[DELETED_PSEUDOFIELD_ALIAS]) || (!getDeleted && !record[DELETED_PSEUDOFIELD_ALIAS]))) records[tableId][recordId] = record;

	return children.reduce((carry, childBranch) => {
		return getRecords(childBranch, allRecords, getDeleted, carry);
	}, records);
}

const buildRecordSelector = createSelector(
	[tableSchemaSelector, schemaSelector, recordsSelector, mtmRecordsSelector, recordIdSelector, childrenSelector],
	(mainTableSchema, allSchema, allRecords, allMtmRecords, recordId, unfilteredChildren) => {
		// console.log(`build record for ${recordId}`);
		const { table } = mainTableSchema;
		const { tables } = allSchema;
		const tree = buildTree(table && table.id, recordId, allRecords, allMtmRecords, tables, unfilteredChildren);
		const records = getRecords(tree, allRecords, false);
		const deleted = getRecords(tree, allRecords, true);
		// console.log(tree);
		// console.log(tables);
		// console.log(records);
		// console.log(unfilteredChildren);

		return {
			tree,
			records,
			deleted,
			table,
			fields: table && table.fields,
		};
	}
);

function getRecordIds(branch, allRecords, records = []) {
	const { tableId, recordId, children } = branch;
	const record = allRecords[tableId] && allRecords[tableId][recordId];
	
	if (record) records.push({ tableId, recordId });

	return children.reduce((carry, childBranch) => {
		return getRecordIds(childBranch, allRecords, carry);
	}, records);
}

export const buildCancelRecordSelector = createSelector(
	[tableSchemaSelector, schemaSelector, recordsSelector, mtmRecordsSelector, recordIdSelector, childrenSelector],
	(mainTableSchema, allSchema, allRecords, allMtmRecords, recordId, unfilteredChildren) => {
		// console.log(`build record for ${recordId}`);
		const { table } = mainTableSchema;
		const { tables } = allSchema;
		const tree = buildTree(table && table.id, recordId, allRecords, allMtmRecords, tables, unfilteredChildren);
		const records = getRecordIds(tree, allRecords);

		return {
			records,
			table,
		};
	}
);

export const buildSaveRecordSelector = createSelector(
	[buildRecordSelector, saveStateSelector],
	(builtRecord, saveState) => {
		
		return {
			...builtRecord,
			saveState,
		};
	},
);

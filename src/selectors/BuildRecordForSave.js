import { createSelector } from 'reselect';
import { tableSchemaSelector } from 'selectors/TableSchema';

import { PARENTKEY_ALIAS, PRIKEY_ALIAS } from 'freestone/SchemaProps';

const recordsSelector = state => state.recordForm.records;
const recordIdSelector = (state, props) => props.params.recordId;
const childrenSelector = state => state.schema.children;

function getChildrenRecordIds(records, parentRecordId, parentTableId) {
	// console.log(records, parentRecordId);
	return records && Object.keys(records).map((recordId) => {
		const record = records[recordId];
		// console.log(record);
		return record[`${PARENTKEY_ALIAS}_${parentTableId}`] === parentRecordId && record;
	}).filter(record => record).map(record => record[PRIKEY_ALIAS]);
}

//get un tree de IDs de records et de ses children
function buildTree(tableId, recordId, allRecords, unfilteredChildren) {
	const childrenTables = unfilteredChildren[tableId];
	// children = 
	// console.log(childrenTables, tableId);
	const children = (childrenTables && childrenTables.reduce((carry, childTableId) => {
		const childrenRecordIds = getChildrenRecordIds(allRecords[childTableId], recordId, tableId);
		const childrenRecords = childrenRecordIds && childrenRecordIds.map(childRecId => {
			return buildTree(childTableId, childRecId, allRecords, unfilteredChildren);
		});
		return carry && childrenRecords && carry.concat(childrenRecords);
	}, [])) || [];
	// console.log(children);
	const branch = {
		recordId,
		tableId,
		children,
	};
	return branch;
}

//utilise le tree pour retriever les records référencés dans ce tree
function getRecords(branch, allRecords, records = {}) {
	// console.log(branch);
	const { tableId, recordId, children } = branch;
	const record = allRecords[tableId] && allRecords[tableId][recordId];
	records[tableId] = records[tableId] || {};
	records[tableId][recordId] = record;
	return children.reduce((carry, childBranch) => {
		return getRecords(childBranch, allRecords, carry);
	}, records);
}

export const saveRecordSelector = createSelector(
	[tableSchemaSelector, recordsSelector, recordIdSelector, childrenSelector],
	(mainTableSchema, allRecords, recordId, unfilteredChildren) => {
		// console.log(`build record for ${recordId}`);
		const { table } = mainTableSchema;
		const tree = buildTree(table && table.id, recordId, allRecords, unfilteredChildren);
		const records = getRecords(tree, allRecords);
		// console.log(tree);
		// console.log(records);
		// console.log(fileInputIds);
		// console.log(unfilteredChildren);

		return {
			tree,
			records,
			table,
			fields: table && table.fields,
		};
	}
);

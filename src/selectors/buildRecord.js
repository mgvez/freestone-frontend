import { createSelector } from 'reselect';
import { tableSchemaSelector } from './tableSchema';
import { schemaSelector } from './schema';
import { getSubformFieldId } from '../freestone/schemaHelpers';
import { getRecordsFromParent } from './formChildrenRecords';
import { isNew } from '../utils/UniqueId';
// import createRecord from 'freestone/createRecord';

import { DELETED_PSEUDOFIELD_ALIAS, TYPE_MTM, PRIKEY_ALIAS } from '../freestone/schemaProps';

const recordsSelector = state => state.freestone.recordForm.records;
const mtmRecordsSelector = state => state.freestone.recordForm.mtmRecords;
const recordIdSelector = (state, props) => props.recordId;
const childrenSelector = state => state.freestone.schema.children;

const allPermsSelector = state => state.freestone.permissions.sitePermissions;

const saveStateSelector = state => state.freestone.save;
const listPageAfterSaveSelector = state => state.freestone.nav.listPageAfterSave;

//get un tree de IDs de records et de ses children
function buildTree(tableId, recordId, allRecords, allMtmRecords, allTables, unfilteredChildren) {
	const childrenTables = unfilteredChildren && unfilteredChildren[tableId] || [];
	// children =
	// console.log(childrenTables, tableId);
	const children = childrenTables.reduce((allChildrenRecords, childTableId) => {
		// console.log('table %s is child of %s', childTableId, tableId);

		if (allTables[childTableId] && allTables[childTableId].type === TYPE_MTM) {
			const thisMtm = (allMtmRecords[childTableId] && allMtmRecords[childTableId][tableId] && allMtmRecords[childTableId][tableId][recordId]) || null;

			allChildrenRecords.mtmChildren.push({
				tableId: childTableId,
				records: thisMtm,
			});

		} else {
			const subformFieldId = getSubformFieldId(childTableId, tableId, allTables);
			const childrenRecordIds = getRecordsFromParent(allRecords[childTableId], allRecords[tableId] && allRecords[tableId][recordId], subformFieldId).filter(
				record => record
			).map(
				record => record[PRIKEY_ALIAS]
			);

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


//Hook record before sending to db (for example to encrypt value)
function hookRecord(record) {
	const hook = window.freestone && window.freestone.hooks && window.freestone.hooks.setFieldValue;
	if (!hook) return record;
	return Object.keys(record).reduce((hookedRecord, fieldId) => {
		hookedRecord[fieldId] = hook(fieldId, hookedRecord[fieldId]);
		return hookedRecord;
	}, { ...record });
}

//utilise le tree pour retriever les records référencés dans ce tree
function getRecords(branch, allRecords, getDeleted, records = {}) {
	const { tableId, recordId, children } = branch;
	const record = allRecords[tableId] && allRecords[tableId][recordId];
	records[tableId] = records[tableId] || {};

	if (
		record && 
		(
			(getDeleted && record[DELETED_PSEUDOFIELD_ALIAS] && !isNew(recordId))
			|| (!getDeleted && !record[DELETED_PSEUDOFIELD_ALIAS])
		)
	) {
		records[tableId][recordId] = hookRecord(record);
	}

	return children.reduce((carry, childBranch) => {
		return getRecords(childBranch, allRecords, getDeleted, carry);
	}, records);
}

function getPermissions(branch, allPerms, permissions = {}) {
	const { tableId, recordId, children } = branch;
	permissions[tableId] = permissions[tableId] || {};
	permissions[tableId][recordId] = allPerms[tableId] && allPerms[tableId][recordId];
	return children.reduce((carry, childBranch) => {
		return getPermissions(childBranch, allPerms, carry);
	}, permissions);
}

const buildRecordSelector = createSelector(
	[tableSchemaSelector, schemaSelector, recordsSelector, mtmRecordsSelector, recordIdSelector, allPermsSelector, childrenSelector, listPageAfterSaveSelector],
	(mainTableSchema, allSchema, allRecords, allMtmRecords, recordId, allPerms, unfilteredChildren, allListPageAfterSave) => {
		// console.log(`build record for ${recordId}`);
		const { table } = mainTableSchema;
		const { tables } = allSchema;
		const tree = buildTree(table && table.id, recordId, allRecords, allMtmRecords, tables, unfilteredChildren);
		const records = getRecords(tree, allRecords, false);
		const deleted = getRecords(tree, allRecords, true);
		const permissions = getPermissions(tree, allPerms);
		// console.log(tree);
		// console.log(tables);
		// console.log(records);
		// console.log(permissions);

		// console.log(unfilteredChildren);
		const afterSaveLocation = table && allListPageAfterSave[table.name] && allListPageAfterSave[table.name][recordId];
		// console.log(allListPageAfterSave);
		return {
			tree,
			table,
			fields: table && table.fields,
			records,
			deleted,
			permissions,
			afterSaveLocation,
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

/**
 * Build a list of all records to remove from the state when cancelling edit. This will also unlock these records in the backend.
 */
export const buildCancelRecordSelector = createSelector(
	[tableSchemaSelector, schemaSelector, recordsSelector, mtmRecordsSelector, recordIdSelector, childrenSelector, listPageAfterSaveSelector],
	(mainTableSchema, allSchema, allRecords, allMtmRecords, recordId, unfilteredChildren, allListPageAfterSave) => {
		// console.log(`build record for ${recordId}`);
		const { table } = mainTableSchema;
		const { tables } = allSchema;
		const tree = buildTree(table && table.id, recordId, allRecords, allMtmRecords, tables, unfilteredChildren);
		const records = getRecordIds(tree, allRecords);

		const afterCancelLocation = table && allListPageAfterSave[table.name] && allListPageAfterSave[table.name][recordId];

		return {
			records,
			table,
			afterCancelLocation,
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

import { createSelector } from 'reselect';
import { tableSchemaSelector } from 'selectors/TableSchema';
import { schemaSelector } from 'selectors/Schema';

import { PARENTKEY_ALIAS, PRIKEY_ALIAS } from 'freestone/SchemaProps';

const fileTypes = ['img', 'file'];

const recordsSelector = state => state.recordForm.records;
const recordIdSelector = (state, props) => props.params.recordId;
const childrenSelector = state => state.schema.children;

function getChildrenRecordIds(records, parentRecordId) {
	return records && Object.keys(records).map((recordId) => {
		const record = records[recordId];
		// console.log(record);
		return record[PARENTKEY_ALIAS] === parentRecordId && record;
	}).filter(record => record).map(record => record[PRIKEY_ALIAS]);
}

function buildRecord(tableId, recordId, allRecords, unfilteredChildren) {
	const values = recordId && tableId && allRecords[tableId] && allRecords[tableId][recordId];

	const childrenTables = unfilteredChildren[tableId];
	// children = 
	const children = childrenTables && childrenTables.reduce((carry, childTableId) => {
		const childrenRecordIds = getChildrenRecordIds(allRecords[childTableId], recordId);
		carry[childTableId] = childrenRecordIds && childrenRecordIds.map(childRecId => {
			return buildRecord(childTableId, childRecId, allRecords, unfilteredChildren);
		});
		return carry;
	}, {});
	// console.log(children);
	const record = {
		values,
		children,
	};
	return record;
}

function getFileInputIds(tableId, recordId, allRecords, unfilteredChildren, allTables) {
	const table = allTables[tableId];

	let fileFields = table.fields.filter(field => ~fileTypes.indexOf(field.type)).map(field => {
		return { fieldId: field.id, recId: recordId };
	});
	const childrenTables = unfilteredChildren[tableId];
	if (childrenTables) {
		fileFields = childrenTables.reduce((carry, childTableId) => {
			const childrenRecordIds = getChildrenRecordIds(allRecords[childTableId], recordId);
			if (childrenRecordIds) {
				return carry.concat(childrenRecordIds.reduce((childrenFileFields, childRecId) => {
					return childrenFileFields.concat(getFileInputIds(childTableId, childRecId, allRecords, unfilteredChildren, allTables));
				}, []));
			}
			return carry;
		}, fileFields);
	}
	return fileFields;
	// const childrenTables = unfilteredChildren[tableId];
}

export const saveRecordSelector = createSelector(
	[tableSchemaSelector, recordsSelector, recordIdSelector, childrenSelector, schemaSelector],
	(mainTableSchema, records, recordId, unfilteredChildren, schema) => {
		console.log(`build record for ${recordId}`);
		const { table } = mainTableSchema;
		const record = buildRecord(table && table.id, recordId, records, unfilteredChildren);
		const fileInputIds = getFileInputIds(table && table.id, recordId, records, unfilteredChildren, schema.tables);
		// console.log(record);
		// console.log(fileInputIds);

		return {
			record,
			table,
			fileInputIds,
			fields: table && table.fields,
		};
	}
);

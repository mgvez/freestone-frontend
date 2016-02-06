import { createSelector } from 'reselect';
import { tableSchemaSelector } from 'selectors/TableSchema';

import { PARENTKEY_ALIAS, PRIKEY_ALIAS } from 'freestone/SchemaProps';

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

export const saveRecordSelector = createSelector(
	[tableSchemaSelector, recordsSelector, recordIdSelector, childrenSelector],
	(schema, records, recordId, unfilteredChildren, foreignOptionsAll) => {
		// console.log(`build record for ${recordId}`);
		const { table } = schema;
		const record = buildRecord(table && table.id, recordId, records, unfilteredChildren);
		// console.log(record);
		return {
			record,
			table,
			fields: table && table.fields,
		};
	}
);

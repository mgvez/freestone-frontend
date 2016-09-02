
import { PRIKEY_ALIAS } from 'freestone/schemaProps';


export function getForeignFieldId(tableFromId, tableToId, allTables) {
	// console.log(allTables);
	// console.log(tableFromId, tableToId);
	const tableFrom = allTables[tableFromId];
	if (!tableFrom) return null;
	const foreignField = tableFrom.fields.find(field => {
		return field.foreign && field.foreign.foreignTableId === tableToId;
	});
	// console.log(foreignField);
	return foreignField && foreignField.id;
}

export function getChildrenRecordIds(records, parentRecordId, linkFieldId) {
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

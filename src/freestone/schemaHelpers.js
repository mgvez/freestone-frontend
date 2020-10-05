
import { PRIKEY_ALIAS } from './schemaProps';


export function getSubformFieldId(tableFromId, tableToId, allTables) {
	const tableFrom = allTables[tableFromId];
	if (!tableFrom) return null;
	const foreignField = tableFrom.parentLink[tableToId];
	// console.log(foreignField);
	return foreignField && foreignField.id;
}

export function getChildrenRecordIds(records, parentRecordId, linkFieldId) {
	// console.log(records, parentRecordId, linkFieldId);
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

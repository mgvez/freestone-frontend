
import { PRIKEY_ALIAS } from './schemaProps';


export function getSubformFieldId(tableFromId, tableToId, allTables) {
	const tableFrom = allTables[tableFromId];
	if (!tableFrom) return null;
	const foreignField = tableFrom.parentLink[tableToId];
	// console.log(foreignField);
	return foreignField && foreignField.id;
}


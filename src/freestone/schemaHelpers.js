

export function getSubformFieldId(tableFromId, tableToId, allTables) {
	const tableFrom = allTables[tableFromId];
	if (!tableFrom) return null;
	const foreignField = tableFrom.parentLink[tableToId];
	return foreignField && foreignField.id;
}

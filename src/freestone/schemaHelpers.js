
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

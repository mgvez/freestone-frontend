
/**
	Retourne les IDs des champs fireign pour lesquels on aura besoin d'une valeur, mais qui ne sont pas loadés
*/
export function getUnloadedOptions(table, allForeignOptions) {
	return table.searchableFields.map(field => {
		if (field.foreign) {
			return !allForeignOptions[field.id] && field.id;
		}
		return false;
	}).filter(val => val);
}

/**
	Prend un record et retourne un string qui le représente, pour afficher dans les widgets (e.g. loaded records)
*/
export function getRecordLabel(rec, table, allForeignOptions = []) {
	// console.log(rec);
	return table.searchableFields.map(field => {
		const val = rec[field.id] || rec[field.alias];
		if (field.foreign) {
			const foreignValues = allForeignOptions[field.id];
			if (!foreignValues) {
				return val;
			}
			// console.log(typeof val, val);
			const foreignRec = foreignValues.values.find(foreignValue => {
				// console.log(foreignValue);
				return foreignValue.value === val;
			});
			return foreignRec && foreignRec.label;
		}
		const node = document.createElement('div');
		node.innerHTML = val;
		return node.textContent || null;
	}).filter(val => !!val).join(' | ');
}

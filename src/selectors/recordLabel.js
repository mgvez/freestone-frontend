
export function getForeignLabel(foreignValue, fieldId, allForeignOptions, allForeignLabels) {
	if (!foreignValue || foreignValue === '0') return '';
	const labelValues = allForeignLabels && allForeignLabels[fieldId];
	const foreignValues = allForeignOptions && allForeignOptions[fieldId];
	//attempt to find the value either in foreign options or in foreign labels (which have the same structure)
	const label = [foreignValues, labelValues].reduce((resolvedLabel, records) => {
		if (!records || resolvedLabel) {
			return resolvedLabel;
		}
		//finds corresponding record amongst all options 
		const foreignRec = records.values.find(rec => {
			return rec.value === foreignValue;
		});
		return foreignRec && foreignRec.label;
	}, null);
	return label;
}

/**
	Retourne les IDs des champs fireign pour lesquels on aura besoin d'une valeur, mais qui ne sont pas loadés
*/
export function getUnloadedLabels(rec, table, allForeignOptions, allForeignLabels) {
	return table.labelFields.map(field => {
		if (field.foreign) {
			const foreignRecordId = rec[field.id] || rec[field.alias];
			if (!foreignRecordId || foreignRecordId === '0') return false;
			const label = getForeignLabel(foreignRecordId, field.id, allForeignOptions, allForeignLabels);
			if (label === null) {
				return {
					fieldId: field.id,
					foreignRecordId,
				};
			}
		}
		return false;
	}).filter(val => val);
}


/**
	Prend un record et retourne un string qui le représente, pour afficher dans les widgets (e.g. loaded records)
*/
export function getRecordLabel(rec, table, allForeignOptions, allForeignLabels) {
	return table.labelFields.map(field => {
		const val = rec[field.id] || rec[field.alias];
		if (!val) return null;
		if (field.foreign) {
			return getForeignLabel(val, field.id, allForeignOptions, allForeignLabels);
		}
		const node = document.createElement('div');
		node.innerHTML = val;
		const tx = node.textContent || null;
		if (tx && tx.length > 50) {
			return tx.substr(0, 50) + '...';
		}
		return tx;
	}).filter(val => !!val).join(' | ');
}

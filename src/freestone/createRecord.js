
import uniqueId from 'utils/UniqueId';
import { PRIKEY_ALIAS, TYPE_ORDER } from 'freestone/schemaProps';

export default (table, parentTableId, parentRecordId, orderVal) => {
	const newRecord = table.fields.reduce((record, field) => {
		// console.log(field);
		if (field.type === TYPE_ORDER) {
			record[field.id] = orderVal || '';
		} else {
			record[field.id] = field.default;
		}
		return record;
	}, {});
	const newRecordId = uniqueId();
	newRecord[PRIKEY_ALIAS] = newRecord[table.prikey.id] = newRecordId;

	if (parentTableId) {
		const parentFieldId = table.parentLink[parentTableId] && table.parentLink[parentTableId].id;
		newRecord[parentFieldId] = parentRecordId;
	}

	return {
		newRecord,
		newRecordId,
	};
};

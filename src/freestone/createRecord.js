
import uniqueId from '../utils/UniqueId';
import { PRIKEY_ALIAS, TYPE_ORDER } from './schemaProps';

export default (table, parentTableId, parentRecordId, orderVal, model) => {
	const newRecord = table.fields.reduce((record, field) => {
		// console.log(field.name, field.default);
		if (field.type === TYPE_ORDER) {
			record[field.id] = orderVal || '';
		} else if (model) {
			record[field.id] = model[field.id];
		} else {
			record[field.id] = String(field.default);
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

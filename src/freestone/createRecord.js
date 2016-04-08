
import uniqueId from 'utils/UniqueId';
import { PRIKEY_ALIAS, PARENTKEY_ALIAS } from 'freestone/SchemaProps';

export default (table, parentTableId, parentRecordId, orderVal) => {
	const newRecord = table.fields.reduce((record, field) => {
		// console.log(field);
		if (field.type === 'order') {
			record[field.id] = orderVal;
		} else {
			record[field.id] = field.default;
		}
		return record;
	}, {});
	const newRecordId = uniqueId();
	newRecord[PRIKEY_ALIAS] = newRecord[table.prikey.id] = newRecordId;
	if (parentTableId) newRecord[`${PARENTKEY_ALIAS}_${parentTableId}`] = newRecord[table.parentLink.id] = parentRecordId;
	return {
		newRecord,
		newRecordId,
	};
};

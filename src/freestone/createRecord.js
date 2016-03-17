
import uniqueId from 'utils/UniqueId';
import { PRIKEY_ALIAS, PARENTKEY_ALIAS } from 'freestone/SchemaProps';

export default (table, parentTableId, parentRecordId) => {
	const newRecord = table.fields.reduce((record, field) => {
		// console.log(field);
		record[field.id] = field.default;
		return record;
	}, {});
	const newRecordId = uniqueId();
	newRecord[PRIKEY_ALIAS] = newRecord[table.prikey.id] = newRecordId;
	newRecord[`${PARENTKEY_ALIAS}_${parentTableId}`] = newRecord[table.parentLink.id] = parentRecordId;
	return {
		newRecord,
		newRecordId,
	};
};

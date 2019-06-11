
import uniqueId from '../utils/UniqueId';
import { callApi, getEndpoint } from './api';
import { PRIKEY_ALIAS, TYPE_ORDER } from './SchemaProps';

export default (table, parentTableId, parentRecordId, orderVal, model) => {

	const newRecordPromise = table.fields.reduce((recordPromise, field) => {
		// console.log(field.name, field.default);
		return recordPromise.then(record => {
			// console.log(record);
			if (field.type === TYPE_ORDER) {
				record[field.id] = orderVal || '';
			} else if (model && (model[field.id] || model[field.name])) {
				record[field.id] = model[field.id] || model[field.name];
			} else {
				let val = field.default === null ? '' : String(field.default);
				switch (val.toLowerCase().trim()) {
				case 'now':
				case 'now()': {
					const d = new Date();
					val = 
					d.getFullYear() + '-' +
					(d.getMonth() + 1).toString().padStart(2, '0') + '-' + 
					d.getDate().toString().padStart(2, '0') + 
					' ' + d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0') + ':' + d.getSeconds().toString().padStart(2, '0');
					break;
				}
				//ajax values
				case 'increment': {
					const onDefault = callApi(getEndpoint(`defaultValue/${table.name}/${field.name}`), {});
					return onDefault.then(res => {
						// console.log(res);
						record[field.id] = res.data;
						return record;
					});
				}
				default:
					break;
				}
				record[field.id] = val;
			}
			return Promise.resolve(record);
		});
	}, Promise.resolve({}));

	return newRecordPromise.then(newRecord => {
		// console.log(newRecord);
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
	});
};


import { UNAUTHORIZED, LOGOUT_API } from '../actions/auth';
import { SET_QUICKEDIT_FIELD_VALUE } from '../actions/record';
import { SAVE_QUICKRECORD_API } from '../actions/save';
import { CLEAR_DATA } from '../actions/dev';
import { PRIKEY_ALIAS } from '../freestone/schemaProps';


/**
change la valeur d'un champ (lors de l'édition par user)
*/
function setFieldValue(state, data) {
	const { tableId, recordId, fieldId, val } = data;
	// console.log(tableId, recordId, fieldId, val);
	return {
		...state,
		[tableId]: {
			...(state[tableId] || {}),
			[recordId]: {
				...((state[tableId] && state[tableId][recordId]) || {}),
				[fieldId]: val,
			},
		},
	};
}

function removeRecords(state, recordsToRemove) {
	if (!recordsToRemove) return state;
	return recordsToRemove.reduce((carry, record) => {
		//when getting records from the database, the original record is either the db id OR the temp id if it was a new record. We need to remove that one, as the records on the front are referred to by their temp id until they are saved.
		const { tableId, recordId, recordOriginalId } = record;
		const finalRecordId = recordOriginalId || recordId;
		const tableRecords = { ...carry[tableId] };
		delete tableRecords[finalRecordId];
		carry[tableId] = tableRecords;
		return carry;
	}, { ...state });
}

export default function(state = {}, action) {
	switch (action.type) {
		case UNAUTHORIZED:
		case CLEAR_DATA:
		case LOGOUT_API.SUCCESS:
		case LOGOUT_API.REQUEST:
			return {};
		case SAVE_QUICKRECORD_API.SUCCESS:
			return removeRecords(state, action.data.records);
		case SET_QUICKEDIT_FIELD_VALUE:
			return setFieldValue(state, action.data);
		default:
			return state;
	}
}

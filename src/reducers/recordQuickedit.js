
import { UNAUTHORIZED, LOGOUT_API } from '../actions/auth';
import { SET_QUICKEDIT_FIELD_VALUE } from '../actions/record';
import { SAVE_SINGLE_VALUE_RECORD_API } from '../actions/save';
import { CLEAR_DATA } from '../actions/dev';


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

export default function(state = {}, action) {
	switch (action.type) {
	case UNAUTHORIZED:
	case CLEAR_DATA:
	case LOGOUT_API.SUCCESS:
	case LOGOUT_API.REQUEST:
		return {};
	// case RECORD_SINGLE_API.SUCCESS:
	// 	return receiveRecord(state, action.data);
	case SET_QUICKEDIT_FIELD_VALUE:
		return setFieldValue(state, action.data);
	default:
		return state;
	}
}

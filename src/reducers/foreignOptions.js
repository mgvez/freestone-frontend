
import { UNAUTHORIZED } from 'actions/auth';
import { CLEAR_DATA } from 'actions/dev';
import { RECEIVE_FOREIGN_OPTIONS } from 'actions/foreignOptions';
import { SAVE_RECORD_SUCCESS } from 'actions/save';


export function foreignOptions(state = {}, action) {
	switch (action.type) {
	case UNAUTHORIZED:
		return {};
	case RECEIVE_FOREIGN_OPTIONS: {
		if (!action.data || !action.data.fieldId) return state;
		const fieldId = action.data.fieldId;
		const newState = {
			...state,
			[fieldId]: action.data,
		};
		// console.log(newState);
		return newState;
	}
	case CLEAR_DATA:
	case SAVE_RECORD_SUCCESS:
	case 'CLEAR_SCHEMA':
		return {};
	default:
		// console.log('no change');
		return state;
	}
}

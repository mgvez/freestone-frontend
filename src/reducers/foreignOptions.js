
import { UNAUTHORIZED, LOGOUT_API } from '../actions/auth';
import { CLEAR_DATA } from '../actions/dev';
import { FOREIGN_OPTIONS_API } from '../actions/foreignOptions';
import { SAVE_RECORD_API } from '../actions/save';
import { CLEAR_SCHEMA } from '../actions/schema';


export function foreignOptions(state = {}, action) {
	switch (action.type) {
	case UNAUTHORIZED:
		return {};
	case FOREIGN_OPTIONS_API.SUCCESS: {
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
	case SAVE_RECORD_API.SUCCESS:
	case LOGOUT_API.SUCCESS:
	case CLEAR_SCHEMA:
		return {};
	default:
		// console.log('no change');
		return state;
	}
}

import { CLEAR_ERRORS } from '../actions/errors';
import { FREESTONE_API_FAILURE, FREESTONE_API_FATAL_FAILURE } from '../middleware/api';
import { UNAUTHORIZED, LOGOUT_API } from '../actions/auth';

export default function(state = [], action) {
	// console.log(action);
	switch (action.type) {
		case FREESTONE_API_FAILURE:
		case FREESTONE_API_FATAL_FAILURE:
			return [
				...state,
				{
					message: action.error.responseText || action.error.statusText || action.error.response || action.error.message,
					details: action.error.details,
					isFatal: action.type === FREESTONE_API_FATAL_FAILURE,
					redirectOnError: action.redirectOnError,
				},
			];
		case CLEAR_ERRORS:
		case UNAUTHORIZED:
		case LOGOUT_API.SUCCESS:
		case LOGOUT_API.REQUEST:
			return [];
		default:
			// console.log('no change');
			return state;
	}
}

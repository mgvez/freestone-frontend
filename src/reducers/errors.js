import { CLEAR_ERRORS } from 'actions/dev';
import { FREESTONE_API_FAILURE, FREESTONE_API_FATAL_FAILURE } from 'middleware/api';

export function errors(state = [], action) {
	// console.log(action);
	switch (action.type) {
	case FREESTONE_API_FAILURE:
		return [
			...state,
			action.error.responseText,
		];
	case FREESTONE_API_FATAL_FAILURE:
		// console.log(action.error);
		return [
			...state,
			action.error.responseText || action.error.statusText,
		];
	case CLEAR_ERRORS:
		return [];
	default:
		// console.log('no change');
		return state;
	}
}

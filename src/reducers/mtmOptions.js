import { UNAUTHORIZED } from '../actions/auth';
import { CLEAR_DATA } from '../actions/dev';
import { MTM_OPTIONS_API } from '../actions/record';
import { SAVE_RECORD_API } from '../actions/save';


export function mtmOptions(state = {}, action) {
	switch (action.type) {
	case SAVE_RECORD_API.SUCCESS:
	case CLEAR_DATA:
	case UNAUTHORIZED:
		return {};
	case MTM_OPTIONS_API.SUCCESS: {
		const tableId = action.data.tableId;
		// console.log(action);
		const newState = {
			...state,
			[tableId]: action.data.options,
		};
		// console.log(action.data);
		// console.log(newState);
		return newState;
	}
	default:
		return state;
	}
}


import { SLUG_API } from '../actions/slugs';
import { SAVE_RECORD_API, DELETE_RECORD_API } from '../actions/save';
import { CLEAR_DATA } from '../actions/dev';
import { UNAUTHORIZED, LOGOUT_API } from '../actions/auth';

function removeSlugs(state, records) {
	// console.log(records);
	if (!records) return state;
	return records.reduce((modifiedState, record) => {
		const { tableId, recordId } = record;
		if (!modifiedState[tableId] || !modifiedState[tableId][recordId]) return modifiedState;
		const newState = {
			...modifiedState,
			[tableId]: {
				...modifiedState[tableId],
			},
		};
		delete newState[tableId][recordId];
		return newState;
	}, state);
}

export default function(state = {}, action) {
	switch (action.type) {
	case CLEAR_DATA: 
	case UNAUTHORIZED:
	case LOGOUT_API.SUCCESS:
	case LOGOUT_API.REQUEST:
		return {};
	
	case SLUG_API.SUCCESS: {
		const { tableId, recordId, slugs } = action.data;
		// console.log(action);
		const newState = {
			...state,
			[tableId]: {
				...state[state],
				[recordId]: slugs,
			},
		};
		return newState;
	}
	case SAVE_RECORD_API.SUCCESS:
	case DELETE_RECORD_API.SUCCESS:
		// console.log(action.data);
		return removeSlugs(state, action.data.records);
	default:
		return state;
	}
}

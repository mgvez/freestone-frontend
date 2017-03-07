
import { RECEIVE_SLUG } from 'actions/slugs';
import { SAVE_RECORD_SUCCESS, DELETE_RECORD_SUCCESS } from 'actions/save';
import { CLEAR_DATA } from 'actions/dev';

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
		return {};
	case RECEIVE_SLUG: {
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
	case SAVE_RECORD_SUCCESS:
	case DELETE_RECORD_SUCCESS:
		// console.log(action.data);
		return removeSlugs(state, action.data.records);
	default:
		return state;
	}
}

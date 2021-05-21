import { combineReducers } from 'redux';

import { SLUG_API, WORKING_SLUG_API, CLEAR_WORKING_SLUG } from '../actions/slugs';
import { SAVE_RECORD_API, DELETE_RECORD_API } from '../actions/save';
import { CLEAR_DATA } from '../actions/dev';
import { UNAUTHORIZED, LOGOUT_API } from '../actions/auth';
import { SET_FIELD_VALUE } from '../actions/record';

function removeRecordSlug(state, tableId, recordId) {
	if (!state[tableId] || !state[tableId][recordId]) return state;
	const newState = {
		...state,
		[tableId]: {
			...state[tableId],
		},
	};
	delete newState[tableId][recordId];
	return newState;

}

function removeSlugs(state, records) {
	// console.log(records);
	if (!records) return state;
	return records.reduce((modifiedState, record) => {
		const { tableId, recordId } = record;
		return removeRecordSlug(modifiedState, tableId, recordId);
	}, state);
}

function makeReducer(api, isWorkingSlugs) {
	return (state = {}, action) => {
		switch (action.type) {
		case CLEAR_DATA: 
		case UNAUTHORIZED:
		case LOGOUT_API.SUCCESS:
		case LOGOUT_API.REQUEST:
			return {};
		case api.SUCCESS: {
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
		case SET_FIELD_VALUE: 
		case CLEAR_WORKING_SLUG: {
			if (!isWorkingSlugs) return state;
			// if we delete slugs whenevr the record changes
			const { tableId, recordId } = action.data;
			return removeRecordSlug(state, tableId, recordId);
		}
		default:
			return state;
		}
	};
}

export default combineReducers({
	slugs: makeReducer(SLUG_API),
	working: makeReducer(WORKING_SLUG_API, true),
});

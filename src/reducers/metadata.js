import { combineReducers } from 'redux';
import {
	WORKING_TITLE_API,
	CLEAR_WORKING_TITLE,
	WORKING_STRUCTURED_API,
	CLEAR_WORKING_STRUCTURED,
} from '../actions/metadata';
import { SAVE_RECORD_API, DELETE_RECORD_API } from '../actions/save';
import { CLEAR_DATA } from '../actions/dev';
import { UNAUTHORIZED, LOGOUT_API } from '../actions/auth';
import { SET_FIELD_VALUE } from '../actions/record';

function removeRecordMeta(state, tableId, recordId, lang) {
	if (!state[tableId] || !state[tableId][recordId]) return state;

	if (lang && !state[tableId][recordId][lang]) return state;
	const newState = {
		...state,
		[tableId]: {
			...state[tableId],
		},
	};
	if (lang) {
		newState[tableId][recordId] = {
			...newState[tableId][recordId],
		};
		delete newState[tableId][recordId][lang];
	} else {
		delete newState[tableId][recordId];
	}
	return newState;

}

function removeMetas(state, records) {
	if (!records) return state;
	return records.reduce((modifiedState, record) => {
		const { tableId, recordId } = record;
		return removeRecordMeta(modifiedState, tableId, recordId);
	}, state);
}

function receiveMetas(state, actionData) {
	const { tableId, recordId, data, lang } = actionData;
	const newState = {
		...state,
		[tableId]: {
			...state[tableId],
			[recordId]: {
				...(state[tableId] && state[tableId][recordId]),
				[lang]: data,
			},
		},
	};
	return newState;
}


const titles = (state = {}, action) => {
	switch (action.type) {
		case CLEAR_DATA: 
		case UNAUTHORIZED:
		case LOGOUT_API.SUCCESS:
		case LOGOUT_API.REQUEST:
			return {};
		case WORKING_TITLE_API.SUCCESS: 
			return receiveMetas(state, action.data);
		case SAVE_RECORD_API.SUCCESS:
		case DELETE_RECORD_API.SUCCESS:
			return removeMetas(state, action.data.records);
		case SET_FIELD_VALUE: 
		case CLEAR_WORKING_TITLE: {
			const { tableId, recordId, lang } = action.data;
			return removeRecordMeta(state, tableId, recordId, lang);
		}
		default:
			return state;
	}
};

// structured data field
const structured = (state = {}, action) => {
	switch (action.type) {
		case CLEAR_DATA: 
		case UNAUTHORIZED:
		case LOGOUT_API.SUCCESS:
		case LOGOUT_API.REQUEST:
			return {};
		case WORKING_STRUCTURED_API.SUCCESS: 
			return receiveMetas(state, action.data);
		case SAVE_RECORD_API.SUCCESS:
		case DELETE_RECORD_API.SUCCESS:
			return removeMetas(state, action.data.records);
		case SET_FIELD_VALUE: 
		case CLEAR_WORKING_STRUCTURED: {
			const { tableId, recordId, lang } = action.data;
			return removeRecordMeta(state, tableId, recordId, lang);
		}
		default:
			return state;
	}
};


export default combineReducers({
	titles,
	structured,
});

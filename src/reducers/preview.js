import { combineReducers } from 'redux';

import { PRIKEY_ALIAS } from '../freestone/schemaProps';
import { UNAUTHORIZED, LOGOUT_API } from '../actions/auth';
import { CLEAR_DATA } from '../actions/dev';
import { RECORD_SINGLE_API, CANCEL_EDIT_RECORD } from '../actions/record';
import { SET_RECORD_IS_PREVIEWING, SET_CURRENT_PREVIEW, SET_PREVIEW_VIEW_TYPE, PREVIEW_IFRAME, SET_PREVIEW_MODE } from '../actions/preview';
import { SAVE_RECORD_API, SAVE_PREVIEW_API, DELETE_RECORD_API } from '../actions/save';

function removeRecord(state, record) {
	const { tableId, recordId } = record;
	const tableRecords = { ...state[tableId] };
	delete tableRecords[recordId];
	state[tableId] = tableRecords;
	return state;
}

function removeRecords(state, recordsToRemove) {
	// console.log(state);
	// console.log(recordsToRemove);
	if (!recordsToRemove) return state;
	return recordsToRemove.reduce(removeRecord, { ...state });
}


function slugs(state = {}, action) {
	switch (action.type) {
	case UNAUTHORIZED:
	case CLEAR_DATA:
	case LOGOUT_API.SUCCESS:
	case LOGOUT_API.REQUEST:
		return {};
	case SAVE_RECORD_API.SUCCESS:
	case DELETE_RECORD_API.SUCCESS:
	case CANCEL_EDIT_RECORD:
		return removeRecords(state, action.data.records);
	case RECORD_SINGLE_API.SUCCESS: {
		const { tableId } = action.data;
		const { records } = action.data.tables;
		if (!records) return state;
		return records.reduce((curState, record) => {
			return removeRecord(curState, {
				tableId,
				recordId: record[PRIKEY_ALIAS],
			});
		}, { ...state });
	}
	case SAVE_PREVIEW_API.SUCCESS: {
		// console.log(action.data);
		const { tableId, recordOriginalId } = action.data.mainRecord;
		return {
			...state,
			[tableId]: {
				...state[tableId],
				[recordOriginalId]: action.data.slugs,
			},
		};
	}
	default:
		return state;
	}
}

function previewIds(state = {}, action) {
	switch (action.type) {
	case UNAUTHORIZED:
	case CLEAR_DATA:
	case LOGOUT_API.SUCCESS:
	case LOGOUT_API.REQUEST:
		return {};
	case SAVE_RECORD_API.SUCCESS:
	case DELETE_RECORD_API.SUCCESS:
	case CANCEL_EDIT_RECORD:
		return removeRecords(state, action.data.records);
	case RECORD_SINGLE_API.SUCCESS: {
		const { tableId } = action.data;
		const { records } = action.data.tables;
		if (!records) return state;
		return records.reduce((curState, record) => {
			return removeRecord(curState, {
				tableId,
				recordId: Number(record[PRIKEY_ALIAS]),
			});
		}, { ...state });
	}
	case SAVE_PREVIEW_API.SUCCESS: {
		// console.log(action.data);
		const { tableId, recordOriginalId, recordId } = action.data.mainRecord;
		return {
			...state,
			[tableId]: {
				...state[tableId],
				[recordOriginalId]: recordId,
			},
		};
	}
	default:
		return state;
	}
}


function currentPreview(state = { type: PREVIEW_IFRAME }, action) {
	switch (action.type) {
	case UNAUTHORIZED:
	case CLEAR_DATA:
	case LOGOUT_API.SUCCESS:
	case LOGOUT_API.REQUEST:
	case CANCEL_EDIT_RECORD:
	case SAVE_RECORD_API.SUCCESS:
	case DELETE_RECORD_API.SUCCESS:
		return {};
	case SET_PREVIEW_VIEW_TYPE:
	case SET_CURRENT_PREVIEW: {
		return {
			...state,
			...action.data,
		};
	}
	default:
		return state;
	}
}

function mainPreviewState(state = false, action) {
	switch (action.type) {
	case UNAUTHORIZED:
	case CLEAR_DATA:
	case LOGOUT_API.SUCCESS:
	case LOGOUT_API.REQUEST:
	case CANCEL_EDIT_RECORD:
	case SAVE_RECORD_API.SUCCESS:
	case DELETE_RECORD_API.SUCCESS:
		return false;
	case SET_RECORD_IS_PREVIEWING: 
		return action.data;
	default:
		return state;
	}
}

export function subPreviewMode(state = {}, action) {
	switch (action.type) {
	case SET_PREVIEW_MODE: {
		const tableId = action.data.tableId;
		// console.log(action);
		const newState = {
			...state,
			[tableId]: action.data.mode,
		};
		return newState;
	}
	default:
		return state;
	}
}


export default combineReducers({
	slugs,
	previewIds,
	mainPreviewState,
	currentPreview,
	subPreviewMode,
});

import { combineReducers } from 'redux';

import { UNAUTHORIZED, LOGOUT_API } from '../actions/auth';
import { BANK_IMAGE_API, BANK_USES_API, BANK_FILE_API, BANK_SETUP_SELECT, BANK_CANCEL_SELECT } from '../actions/bank';
import { SAVE_RECORD_API, DELETE_RECORD_API } from '../actions/save';
import { BANK_IMG_TABLE, BANK_DOCS_TABLE } from '../freestone/schemaProps';
import { CLEAR_DATA } from '../actions/dev';

const initialState = {};

function removeRecords(state, recordsToRemove, checkingTable) {
	if (!recordsToRemove) return state;

	return recordsToRemove.reduce((carry, record) => {
		const { tableName, recordId } = record;
		if (tableName !== checkingTable) return carry;
		delete carry[recordId];
		return carry;
	}, { ...state });
}

function images(state = initialState, action) {
	switch (action.type) {
	case UNAUTHORIZED:
	case LOGOUT_API.SUCCESS:
	case CLEAR_DATA:
		return initialState;
	case SAVE_RECORD_API.SUCCESS:
	case DELETE_RECORD_API.SUCCESS:
		//m fonction que pour les records eux meme (structure fonctionne)
		return removeRecords(state, action.data.records, BANK_IMG_TABLE);
	case BANK_IMAGE_API.SUCCESS: {
		// console.log(action.data.nRecords);
		if (!action.data) return state;
		const { id, maxSize, markup } = action.data;
		// console.log(action.data);
		return {
			...state,
			[`${id}_${maxSize}`]: markup,
		};
	}
	default:
		// console.log('no change');
		return state;
	}
}

function files(state = initialState, action) {
	switch (action.type) {
	case UNAUTHORIZED:
	case LOGOUT_API.SUCCESS:
	case CLEAR_DATA:
		return initialState;
	case SAVE_RECORD_API.SUCCESS:
	case DELETE_RECORD_API.SUCCESS:
		//m fonction que pour les records eux meme (structure fonctionne)
		return removeRecords(state, action.data.records, BANK_DOCS_TABLE);
	case BANK_FILE_API.SUCCESS: {
		if (!action.data) return state;
		const { id, item } = action.data;
		// console.log(action.data);
		return {
			...state,
			[id]: item,
		};
	}
	default:
		// console.log('no change');
		return state;
	}
}

function uses(state = {}, action) {
	switch (action.type) {
	case UNAUTHORIZED:
	case LOGOUT_API.SUCCESS:
	case CLEAR_DATA:
	case SAVE_RECORD_API.SUCCESS:
	case DELETE_RECORD_API.SUCCESS:
		return {};
	case BANK_USES_API.SUCCESS: {
		// console.log(action.data.nRecords);
		if (!action.data) return state;
		const { bankName, itemId, records } = action.data;
		// console.log(action.data);
		const bankNewState = state[bankName] ? { ...state[bankName] } : {};
		bankNewState[itemId] = records;
		return {
			...state,
			[bankName]: bankNewState,
		};
	}
	default:
		// console.log('no change');
		return state;
	}
}

function selection(state = {}, action) {
	switch (action.type) {
	case UNAUTHORIZED:
	case LOGOUT_API.SUCCESS:
	case CLEAR_DATA:
	case BANK_CANCEL_SELECT:
		return {};
	case BANK_SETUP_SELECT: {
		return {
			bankRecord: null,
			destination: action,
		};
	}
	default:
		// console.log('no change');
		return state;
	}
}

export default combineReducers({
	images,
	files,
	uses,
	selection,
});


import { UNAUTHORIZED, LOGOUT_SUCCESS } from 'actions/auth';
import { RECEIVE_BANK_IMAGE, RECEIVE_BANK_USES } from 'actions/bank';
import { SAVE_RECORD_SUCCESS, DELETE_RECORD_SUCCESS } from 'actions/save';
import { BANK_IMG_TABLE } from 'freestone/schemaProps';
import { CLEAR_DATA } from 'actions/dev';

const initialState = {};

function removeRecords(state, recordsToRemove) {
	if (!recordsToRemove) return state;

	return recordsToRemove.reduce((carry, record) => {
		const { tableName, recordId } = record;
		if (tableName !== BANK_IMG_TABLE) return carry;
		delete carry[recordId];
		return carry;
	}, { ...state });
}

export function bankImage(state = initialState, action) {
	switch (action.type) {
	case UNAUTHORIZED:
	case LOGOUT_SUCCESS:
	case CLEAR_DATA:
		return initialState;
	case SAVE_RECORD_SUCCESS:
	case DELETE_RECORD_SUCCESS:
		//m fonction que pour les records eux meme (structure fonctionne)
		return removeRecords(state, action.data.records);
	case RECEIVE_BANK_IMAGE: {
		// console.log(action.data.nRecords);
		if (!action.data) return state;
		const { id, markup } = action.data;
		// console.log(action.data);
		return {
			...state,
			[id]: markup,
		};
	}
	default:
		// console.log('no change');
		return state;
	}
}

export function bankUses(state = {}, action) {
	switch (action.type) {
	case UNAUTHORIZED:
	case LOGOUT_SUCCESS:
	case CLEAR_DATA:
	case SAVE_RECORD_SUCCESS:
	case DELETE_RECORD_SUCCESS:
		return {};
	case RECEIVE_BANK_USES: {
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

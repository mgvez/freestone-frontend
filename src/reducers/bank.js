
import { UNAUTHORIZED, LOGOUT_SUCCESS } from 'actions/auth';
import { RECEIVE_BANK_IMAGE } from 'actions/bank';
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


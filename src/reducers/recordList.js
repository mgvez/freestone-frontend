import { UNAUTHORIZED } from 'actions/auth';
import { RECEIVE_RECORD_LIST, SWAPPED_ANIMATED } from 'actions/record';
import { SAVE_RECORD_SUCCESS, SWAP_ORDER_SUCCESS, DELETE_RECORD_SUCCESS } from 'actions/save';

const initialState = {
	table: null,
	page: null,
	search: null,
	pageSize: null,
	nRecords: null,
	error: null,
	records: [],
	swappedRecords: [],
};

export function recordList(state = initialState, action) {
	switch (action.type) {
	case UNAUTHORIZED:
	case SAVE_RECORD_SUCCESS:
	case DELETE_RECORD_SUCCESS:
		return initialState;
	case SWAPPED_ANIMATED:
		return { ...state, swappedRecords: [] };
	case SWAP_ORDER_SUCCESS:
		return { ...initialState, swappedRecords: action.data.result };
	case RECEIVE_RECORD_LIST:
		// console.log(action.data.nRecords);
		if (!action.data) return state;
		return { ...action.data, swappedRecords: state.swappedRecords };
	default:
		// console.log('no change');
		return state;
	}
}

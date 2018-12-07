import { UNAUTHORIZED } from '../actions/auth';
import { RECORD_LIST_API, SWAPPED_ANIMATED } from '../actions/record';
import { CLEAR_LIST } from '../actions/nav';
import { SAVE_RECORD_API, SWAP_ORDER_API, DELETE_RECORD_API } from '../actions/save';

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

export default function(state = initialState, action) {
	switch (action.type) {
	case UNAUTHORIZED:
	case CLEAR_LIST:
	case SAVE_RECORD_API.SUCCESS:
	case DELETE_RECORD_API.SUCCESS:
		return initialState;
	case SWAPPED_ANIMATED:
		return { ...state, swappedRecords: [] };
	case SWAP_ORDER_API.SUCCESS:
		return { ...initialState, swappedRecords: action.data.result };
	case RECORD_LIST_API.SUCCESS:
		// console.log(action.data.nRecords);
		if (!action.data) return state;
		return { ...action.data, swappedRecords: state.swappedRecords };
	default:
		// console.log('no change');
		return state;
	}
}

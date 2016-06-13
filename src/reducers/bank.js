
import { UNAUTHORIZED } from 'actions/auth';
import { RECEIVE_IMAGE_BANK_LIST } from 'actions/bank';
import { SAVE_RECORD_SUCCESS, DELETE_RECORD_SUCCESS } from 'actions/save';


const initialState = {
	records: null,
	page: 1,
	search: '',
};

export function imageBankList(state = initialState, action) {
	switch (action.type) {
	case UNAUTHORIZED:
	case SAVE_RECORD_SUCCESS:
	case DELETE_RECORD_SUCCESS:
		return initialState;
	case RECEIVE_IMAGE_BANK_LIST:
		// console.log(action.data.nRecords);
		if (!action.data) return state;
		return action.data;
	default:
		// console.log('no change');
		return state;
	}
}

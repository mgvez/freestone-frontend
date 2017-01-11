import { combineReducers } from 'redux';

import { CLEAR_DATA } from 'actions/dev';
import { UNAUTHORIZED } from 'actions/auth';
import { RECEIVE_RECORD_REVISION_LIST } from 'actions/record';
import { SAVE_RECORD_SUCCESS, SWAP_ORDER_SUCCESS, DELETE_RECORD_SUCCESS } from 'actions/save';

function list(state = {}, action) {
	switch (action.type) {
	case UNAUTHORIZED:
	case SAVE_RECORD_SUCCESS:
	case SWAP_ORDER_SUCCESS:
	case CLEAR_DATA:
	case DELETE_RECORD_SUCCESS:
		return {};
	case RECEIVE_RECORD_REVISION_LIST:
		console.log(action.data);
		if (!action.data) return state;
		return action.data;
	default:
		// console.log('no change');
		return state;
	}
}


export default combineReducers({
	list,
});

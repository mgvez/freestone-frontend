import { combineReducers } from 'redux';

import { CLEAR_DATA } from '../actions/dev';
import { UNAUTHORIZED } from '../actions/auth';
import { RECORD_REVISION_LIST_API } from '../actions/record';
import { SAVE_RECORD_API, SWAP_ORDER_API, DELETE_RECORD_API } from '../actions/save';

function list(state = {}, action) {
	switch (action.type) {
	case UNAUTHORIZED:
	case SAVE_RECORD_API.SUCCESS:
	case SWAP_ORDER_API.SUCCESS:
	case CLEAR_DATA:
	case DELETE_RECORD_API.SUCCESS:
		return {};
	case RECORD_REVISION_LIST_API.SUCCESS:
		// console.log(action.data);
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

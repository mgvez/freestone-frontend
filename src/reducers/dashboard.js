
import { LOGOUT_API, UNAUTHORIZED } from '../actions/auth';
import { LATEST_MODIFS_API, CLEAR_LATEST_MODIFS } from '../actions/dashboard';
import { CLEAR_DATA } from '../actions/dev';
import { combineReducers } from 'redux';


function latestModifs(state = null, action) {
	switch (action.type) {
	case LATEST_MODIFS_API.SUCCESS: {
		if (!state) {
			return action.data;
		}
		return {
			values: [
				...state.values,
				...action.data.values,
			],
			hasMoreRecords: action.data.hasMoreRecords,
		};
	}
	case CLEAR_LATEST_MODIFS:
	case CLEAR_DATA:
	case UNAUTHORIZED:
	case LOGOUT_API.REQUEST:
	case LOGOUT_API.SUCCESS:
		return null;
	default:
		return state;
	}
}

export default combineReducers({
	latestModifs,
});


import { LOGOUT_API, UNAUTHORIZED } from '../actions/auth';
import { LATEST_MODIFS_API } from '../actions/dashboard';
import { CLEAR_DATA } from '../actions/dev';
import { combineReducers } from 'redux';


function latestModifs(state = [], action) {
	switch (action.type) {
	case LATEST_MODIFS_API.SUCCESS: {
		return action.data;
	}
	case CLEAR_DATA:
	case UNAUTHORIZED:
	case LOGOUT_API.REQUEST:
	case LOGOUT_API.SUCCESS:
		return [];
	default:
		return state;
	}
}

export default combineReducers({
	latestModifs,
});

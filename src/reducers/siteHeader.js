import { combineReducers } from 'redux';
import { TOGGLE_NAV_VISIBILITY } from 'actions/siteHeader';

function toggleNavVisibility(state = {}, action) {
	switch (action.type) {
	case TOGGLE_NAV_VISIBILITY:
		const wantedVisibility = action.data;
		return {
			...state,
			nav_visibility: wantedVisibility, 
		};
	default:
		return state;
	}
}

export default combineReducers({
	toggleNavVisibility,
});

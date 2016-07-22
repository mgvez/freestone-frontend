import { combineReducers } from 'redux';
import { TOGGLE_NAV_VISIBILITY, TOGGLE_LOADED_RECORDS } from 'actions/siteHeader';

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

function toggleLoadedRecords(state = {}, action) {
	switch (action.type) {
	case TOGGLE_LOADED_RECORDS:
		const wantedVisibility = action.data;
		return {
			...state,
			loaded_records_visibility: wantedVisibility, 
		};
	default:
		return state;
	}
}

export default combineReducers({
	toggleNavVisibility,
	toggleLoadedRecords,
});

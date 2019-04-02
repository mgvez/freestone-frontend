import { TOGGLE_NAV_VISIBILITY, TOGGLE_LOADED_RECORDS } from '../actions/siteHeader';
import { RECORD_SINGLE_API, CANCEL_EDIT_RECORD, SET_RECORD_IS_PREVIEWING } from '../actions/record';

const initialState = {
	loaded_records_visibility: false,
	nav_visibility: true,
	nav_visibility_user: true,
	loaded_records_visibility_user: true,
};

export default function siteHeader(state = initialState, action) {
	switch (action.type) {
	case TOGGLE_LOADED_RECORDS: {
		const requested = action.data;
		return {
			...state,
			loaded_records_visibility_user: requested, 
			loaded_records_visibility: requested, 
		};
	}
	case TOGGLE_NAV_VISIBILITY: {
		const requested = action.data;
		return {
			...state,
			nav_visibility: requested,
			nav_visibility_user: requested,
		};
	}
	case SET_RECORD_IS_PREVIEWING: {
		const isPreviewing = action.data.val;
		const newState = {
			...state,
			nav_visibility: isPreviewing ? false : state.nav_visibility_user,
			loaded_records_visibility: isPreviewing ? false : state.loaded_records_visibility_user,
		};
		return newState;
	}
	default:
		return state;
	}
}

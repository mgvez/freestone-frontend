import { TOGGLE_NAV_VISIBILITY, TOGGLE_LOADED_RECORDS } from 'actions/siteHeader';

const initialState = {
	loaded_records_visibility: false,
	nav_visibility: true,
};

export default function siteHeader(state = initialState, action) {
	switch (action.type) {
	case TOGGLE_LOADED_RECORDS:
		return {
			...state,
			loaded_records_visibility: action.data, 
		};
	case TOGGLE_NAV_VISIBILITY:
		return {
			...state,
			nav_visibility: action.data, 
		};
	default:
		return state;
	}
}

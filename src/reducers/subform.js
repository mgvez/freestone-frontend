import { combineReducers } from 'redux';

import { SET_SUBFORM_VIEW_TYPE, SET_SUBFORM_COLLAPSED } from 'actions/subform';


export function viewState(state = {}, action) {
	switch (action.type) {
	case SET_SUBFORM_VIEW_TYPE: {
		const tableId = action.data.tableId;
		// console.log(action);
		const newState = {
			...state,
			[tableId]: action.data.type,
		};
		return newState;
	}
	default:
		return state;
	}
}

export function collapsedState(state = {}, action) {
	switch (action.type) {
	case SET_SUBFORM_COLLAPSED: {
		const tableId = action.data.tableId;
		// console.log(action);
		const newState = {
			...state,
			[tableId]: action.data.isCollapsed,
		};
		return newState;
	}
	default:
		return state;
	}
}

export default combineReducers({
	viewState,
	collapsedState,
});

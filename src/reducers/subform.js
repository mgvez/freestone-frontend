import { combineReducers } from 'redux';

import {
	SET_SUBFORM_VIEW_TYPE,
	SET_SUBFORM_COLLAPSED,
	SET_SUBFORM_VISIBLE,
	SET_SUBFORM_PREVIEW_MODE,
} from '../actions/subform';
import { CLEAR_DATA } from '../actions/dev';


export function viewState(state = {}, action) {
	switch (action.type) {
	case CLEAR_DATA: 
		return {};
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

export function visibleState(state = {}, action) {
	switch (action.type) {
	case SET_SUBFORM_VISIBLE: {
		const tableId = action.data.tableId;
		// console.log(action);
		const newState = {
			...state,
			[tableId]: action.data.isVisible,
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
	visibleState,
});

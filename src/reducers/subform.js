import { combineReducers } from 'redux';
import { SET_SUBFORM_VIEW_TYPE, SET_SUBFORM_VISIBLE } from '../actions/subform';

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
	visibleState,
});

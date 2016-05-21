import { combineReducers } from 'redux';

import { SET_SUBFORM_VIEW_TYPE } from 'actions/subform';


export function subform(state = {}, action) {
	switch (action.type) {
	case SET_SUBFORM_VIEW_TYPE:
		const tableId = action.data.tableId;
		// console.log(action);
		const newState = {
			...state,
			[tableId]: action.data.type,
		};
		return newState;
	default:
		return state;
	}
}

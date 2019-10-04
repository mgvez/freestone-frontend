import { combineReducers } from 'redux';

import { UNAUTHORIZED, LOGOUT_API } from '../actions/auth';
import { CLEAR_DATA } from '../actions/dev';
import { FOREIGN_OPTIONS_API, FOREIGN_LABELS_API } from '../actions/foreignOptions';
import { SAVE_RECORD_API } from '../actions/save';
import { CLEAR_SCHEMA } from '../actions/schema';
import { MTM_OPTIONS_API } from '../actions/record';

function options(state = {}, action) {
	switch (action.type) {
	case FOREIGN_OPTIONS_API.SUCCESS: {
		if (!action.data || !action.data.fieldId) return state;
		const fieldId = action.data.fieldId;
		const newState = {
			...state,
			[fieldId]: action.data,
		};
		// console.log(newState);
		return newState;
	}
	case UNAUTHORIZED:
	case CLEAR_DATA:
	case SAVE_RECORD_API.SUCCESS:
	case LOGOUT_API.SUCCESS:
	case LOGOUT_API.REQUEST:
	case CLEAR_SCHEMA:
		return {};
	default:
		// console.log('no change');
		return state;
	}
}

//for labels only, if we need to have single values (no need to load all options if we need a few values)
function labels(state = {}, action) {
	switch (action.type) {
	case FOREIGN_LABELS_API.SUCCESS: {
		// console.log(action.data);
		if (!action.data || !action.data.fieldId) return state;
		const fieldId = action.data.fieldId;
		let newFieldState;
		//no options loaded yet, add complete data as state for this field
		if (!state[fieldId]) {
			newFieldState = action.data;
		} else {
			// console.log(state[fieldId].options);
			newFieldState = {
				...state[fieldId],
				options: action.data.options.reduce((vals, current) => {
					if (current.value === '') return vals;
					const idx = vals.find(v => v.value === current.value);
					if (idx) {
						vals[idx] = current;
					} else { 
						vals.push(current);
					}
					return vals;
				}, [...state[fieldId].options]),
			};
		}
		const newState = {
			...state,
			[fieldId]: newFieldState,
		};
		// console.log(newState);
		return newState;
	}
	case CLEAR_DATA:
	case UNAUTHORIZED:
	case SAVE_RECORD_API.SUCCESS:
	case LOGOUT_API.SUCCESS:
	case LOGOUT_API.REQUEST:
	case CLEAR_SCHEMA:
		return {};
	default:
		// console.log('no change');
		return state;
	}
}


function mtm(state = {}, action) {
	switch (action.type) {
	case SAVE_RECORD_API.SUCCESS:
	case CLEAR_DATA:
	case UNAUTHORIZED:
		return {};
	case MTM_OPTIONS_API.SUCCESS: {
		const tableId = action.data.tableId;
		// console.log(action);
		const newState = {
			...state,
			[tableId]: action.data.options,
		};
		// console.log(action.data);
		// console.log(newState);
		return newState;
	}
	default:
		return state;
	}
}


export default combineReducers({
	options,
	mtm,
	labels,
});

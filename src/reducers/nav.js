import { combineReducers } from 'redux';
import { UNAUTHORIZED } from 'actions/auth';
import { CLEAR_DATA } from 'actions/dev';
import { ADD_NAV, TOGGLE_NAV, TOGGLE_VISIBILITY } from 'actions/nav';
import { SAVE_RECORD_SUCCESS } from 'actions/save';

const navInitialState = {
	navGroups: [],
	tables: [],
	modules: [],
	pages: [],
};

function structure(state = navInitialState, action) {
	// console.log(action);
	switch (action.type) {
	case SAVE_RECORD_SUCCESS:
	case UNAUTHORIZED:
	case CLEAR_DATA:
		return navInitialState;
	case ADD_NAV:
		return {
			...state,
			...action.data,
		};
	default:
		// console.log('no change');
		return state;
	}
}

function toggleState(state = {}, action) {
	// console.log(action);
	switch (action.type) {
	case TOGGLE_NAV:
		const id = action.data;
		return {
			...state,
			[id]: !state[id],
		};
	default:
		// console.log('no change');
		return state;
	}
}


function toggleVisibility(state = {}, action) {
	switch (action.type) {
	case TOGGLE_VISIBILITY:
		const wantedVisibility = action.data;
		return {
			...state,
			visible: wantedVisibility, 
		};
	default:
		return state;
	}
}


// function currentNav()

export default combineReducers({
	structure,
	toggleState,
	toggleVisibility,
});

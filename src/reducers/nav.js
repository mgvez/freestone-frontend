import { combineReducers } from 'redux';
import { UNAUTHORIZED } from 'actions/auth';
import { CLEAR_DATA } from 'actions/dev';
import { ADD_NAV, TOGGLE_NAV, LOCK_SCROLL } from 'actions/nav';
import { SAVE_RECORD_SUCCESS, SWAP_ORDER_SUCCESS, DELETE_RECORD_SUCCESS } from 'actions/save';

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
	case SWAP_ORDER_SUCCESS:
	case DELETE_RECORD_SUCCESS:
	case CLEAR_DATA:
		console.log('saved');
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
	case TOGGLE_NAV: {
		const id = action.data;
		return {
			...state,
			[id]: !state[id],
		};
	}
	default:
		// console.log('no change');
		return state;
	}
}
function scrollLock(state = {}, action) {
	// console.log(action);
	switch (action.type) {
	case LOCK_SCROLL: {
		const { path, scroll } = action.data;
		// console.log(path, scroll);
		const newState = {
			...state,
		};
		if (!scroll) {
			delete(newState[path]);
		} else {
			newState[path] = scroll;
		}
		return newState;
	}
	default:
		// console.log('no change');
		return state;
	}
}

// function currentNav()

export default combineReducers({
	structure,
	toggleState,
	scrollLock,
});

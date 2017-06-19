import { combineReducers } from 'redux';
import { UNAUTHORIZED, LOGOUT_SUCCESS } from '../actions/auth';
import { CLEAR_DATA } from '../actions/dev';
import { ADD_NAV, TOGGLE_NAV, LOCK_SCROLL, REMEMBER_LIST_PAGE, ADD_PAGE_HASH_PATH } from '../actions/nav';
import { SAVE_RECORD_SUCCESS, SWAP_ORDER_SUCCESS, DELETE_RECORD_SUCCESS } from '../actions/save';

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
	case LOGOUT_SUCCESS:
	case CLEAR_DATA:
		// console.log('clear');
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

/**
	Une fois savé, on retourne à la page de liste, mais celle d'ou on a ouvert le record qu'on save
*/
function listPageAfterSave(state = {}, action) {
	// console.log(action);

	switch (action.type) {
	case REMEMBER_LIST_PAGE:
		// console.log(action);
		return {
			...state,
			[action.data.tableName]: {
				...state[action.data.tableName],
				[action.data.recId]: action.data.path,
			},
		};
	default:
		// console.log('no change');
		return state;
	}
}

function pageHashes(state = {}, action) {

	switch (action.type) {
	case ADD_PAGE_HASH_PATH:
		// console.log(action.data);
		return {
			...state,
			[action.data.hash]: {
				path: action.data.path,
				pageId: action.data.pageId,
			},
		};
	case CLEAR_DATA:
	case LOGOUT_SUCCESS:
		return {};
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
	listPageAfterSave,
	pageHashes,
});

import { combineReducers } from 'redux';

const navInitialState = {
	navGroups: [],
	tables: [],
	modules: [],
	pages: [],
};

function structure(state = navInitialState, action) {
	// console.log(action);
	switch (action.type) {
	case 'UNAUTHORIZED':
	case 'CLEAR_DATA':
		return navInitialState;
	case 'ADD_NAV':
		return {
			...state,
			...action.data,
		};
	case 'ADD_NAV_TABLE':
		return {
			...state,
			tables: [
				...state.tables,
				action.data,
			],
		};
	case 'ADD_NAV_GROUP':
		return {
			...state,
			navGroups: [
				...state.navGroups,
				action.data,
			],
		};
	default:
		// console.log('no change');
		return state;
	}
}

function toggleState(state = {}, action) {
	// console.log(action);
	switch (action.type) {
	case 'TOGGLE_NAV':
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

//navig quand on a fini de saver un record: pop le stack des pages ou on peut aller
function stack(state = [], action) {
	switch (action.type) {
	case 'STACK_REGISTER_PAGE':
		return [
			...state,
			action.data,
		];
	default:
		return state;
	}
}

// function currentNav()

export default combineReducers({
	structure,
	toggleState,
	stack,
});

import { combineReducers } from 'redux';

function tables(state = {}, action) {
	switch (action.type) {
	case 'UNAUTHORIZED':
		return {};
	case 'RECEIVE_SCHEMA':
		// console.log(action.data.tables);
		if (!action.data.tables) return state;
		return {
			...state,
			...action.data.tables.reduce((newState, table) => {
				newState[table.id] = table;
				return newState;
			}, {}),
		};
	//TEMPORAIRE POUR DEBUG
	case 'CLEAR_ERRORS':
		return {};
	case 'CLEAR_DATA':
		return {};
	default:
		// console.log('no change');
		return state;
	}
}

function children(state = {}, action) {
	switch (action.type) {
	case 'UNAUTHORIZED':
		return {};
	case 'RECEIVE_SCHEMA':
		// console.log(action);
		if (!action.data.children) return state;
		return {
			...state,
			...action.data.children.reduce((newState, childrenDef) => {
				newState[childrenDef.tableId] = childrenDef.children;
				return newState;
			}, {}),
		};
	//TEMPORAIRE POUR DEBUG
	case 'CLEAR_ERRORS':
		return {};
	case 'CLEAR_DATA':
		return {};
	default:
		// console.log('no change');
		return state;
	}
}

function fields(state = {}, action) {
	switch (action.type) {
	case 'UNAUTHORIZED':
		return {};
	case 'RECEIVE_SCHEMA':
		// console.log(action.data.fields);
		if (!action.data.fields) return state;
		return {
			...state,
			...action.data.fields.reduce((newState, field) => {
				newState[field.id] = field;
				return newState;
			}, {}),
		};
	//TEMPORAIRE POUR DEBUG
	case 'CLEAR_ERRORS':
		return {};
	case 'CLEAR_DATA':
		return {};
	default:
		// console.log('no change');
		return state;
	}
}


export default combineReducers({
	tables,
	fields,
	children,
});

import { combineReducers } from 'redux';

function tables(state = {}, action) {
	switch (action.type) {
	case 'UNAUTHORIZED':
		return {};
	case 'RECEIVE_SCHEMA':
		console.log(action);
		if (!action.data.tables) return state;
		return {
			...state,
			...action.data.tables.reduce((newState, table) => {
				newState[table.name] = table;
				return newState;
			}, {}),
		};		
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
		// console.log(action);
		if (!action.data.fields) return state;
		return {
			...state,
			...action.data.fields.reduce((newState, field) => {
				newState[field.id] = field;
				return newState;
			}, {}),
		};
	default:
		// console.log('no change');
		return state;
	}
}


export default combineReducers({
	tables,
	fields,
});

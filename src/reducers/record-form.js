import { combineReducers } from 'redux';

/**
	Bien que pas idéal, les infos reçues doivent comporter quelques infos de structure (table name, prikey, parent field, etc.) qui, bien que théoriquement disponibles dans un autre state, sont inclus au action data, même si ça ajoute de la complexité à l'action. Ajouter un link sur un autre state aurait encore plus compliqué.
*/

function childrenAreLoaded(state = {}, action) {
	switch (action.type) {
	case 'UNAUTHORIZED':
		return {};
	case 'RECEIVE_RECORD':
		if (!action.data || !action.data.tableName) return state;
		const tableName = action.data.tableName;
		const newState = {
			...state,
			[tableName]: {
				...state[tableName],
				[action.data.parentId]: !!action.data.records,
			},
		};
		console.log(newState);
		return newState;
	default:
		// console.log('no change');
		return state;
	}
}

function singleTableRecords(state = {}, newRecords = []) {
	return newRecords.reduce((carry, current) => {
		const key = current.prikey;
		carry[key] = current;
		return carry;
	}, { ...state });
}

function records(state = {}, action) {
	switch (action.type) {
	case 'UNAUTHORIZED':
		return {};
	case 'RECEIVE_RECORD':
		if (!action.data || !action.data.tableName) return state;
		const tableName = action.data.tableName;
		const newState = {
			...state,
			[tableName]: singleTableRecords(state[tableName], action.data.records || []),
		};
		console.log(newState);
		return newState;
	default:
		// console.log('no change');
		return state;
	}
}

export default combineReducers({
	records,
	childrenAreLoaded,
});

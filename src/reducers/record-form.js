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
		// console.log(newState);
		return newState;
	case 'CLEAR_DATA':
		return {};
	default:
		// console.log('no change');
		return state;
	}
}


function setFieldValue(state, data) {
	const { tableName, recordId, fieldName, val } = data;
	return {
		...state,
		[tableName]: {
			...state[tableName],
			[recordId]: {
				...state[tableName][recordId],
				[fieldName]: val,
			},
		},
	};
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
			[tableName]: (action.data.records || []).reduce((carry, current) => {
				const key = current.prikey;
				carry[key] = current;
				return carry;
			}, state[tableName] || {}),
		};
		// console.log(newState);
		return newState;
	case 'SET_FIELD_VALUE':
		return setFieldValue(state, action.data);
	case 'CLEAR_DATA':
		return {};
	default:
		// console.log('no change');
		return state;
	}
}

export default combineReducers({
	records,
	childrenAreLoaded,
});

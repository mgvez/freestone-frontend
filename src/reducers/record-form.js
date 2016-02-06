import { combineReducers } from 'redux';

import { PRIKEY_ALIAS } from 'freestone/SchemaProps';

/**
	Bien que pas idéal, les infos reçues doivent comporter quelques infos de structure (table name, prikey, parent field, etc.) qui, bien que théoriquement disponibles dans un autre state, sont inclus au action data, même si ça ajoute de la complexité à l'action. Ajouter un link sur un autre state aurait encore plus compliqué.
*/

function childrenAreLoaded(state = {}, action) {
	switch (action.type) {
	case 'UNAUTHORIZED':
		return {};
	case 'RECEIVE_RECORD':
		if (!action.data || !action.data.tableId) return state;
		const tableId = action.data.tableId;
		const newState = {
			...state,
			[tableId]: {
				...state[tableId],
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
	const { tableId, recordId, fieldName, val } = data;
	return {
		...state,
		[tableId]: {
			...state[tableId],
			[recordId]: {
				...state[tableId][recordId],
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
		// console.log(action.data);
		if (!action.data || !action.data.tableId) return state;
		const tableId = action.data.tableId;
		const newState = {
			...state,
			[tableId]: (action.data.records || []).reduce((carry, current) => {
				const key = current[PRIKEY_ALIAS];
				carry[key] = current;
				return carry;
			}, state[tableId] || {}),
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

function shownRecords(state = {}, action) {
	switch (action.type) {
	case 'SET_SHOWN_RECORD':
		const tableId = action.data.tableId;
		const newState = {
			...state,
			[tableId]: {
				...state[tableId],
				[action.data.parentRecordId]: action.data.recordId,
			},
		};
		// console.log(action.data);
		// console.log(newState);
		return newState;
	default:
		return state;
	}
}

export default combineReducers({
	records,
	childrenAreLoaded,
	shownRecords,
});

import { combineReducers } from 'redux';

import { PRIKEY_ALIAS } from 'freestone/SchemaProps';

function setFieldValue(state, data) {
	const { tableId, recordId, fieldId, val } = data;
	// console.log(tableId, recordId, fieldId, val);
	return {
		...state,
		[tableId]: {
			...state[tableId],
			[recordId]: {
				...state[tableId][recordId],
				[fieldId]: val,
			},
		},
	};
}

function receiveRecord(state, data) {
	// console.log(action.data);
	if (!data || !data.tableId || !data.records) return state;
	// const { parentTableId, parentRecordId, tableId } = data;
	const { tableId } = data;
	const newState = {
		...state,
		[tableId]: data.records.reduce((tableRecords, record) => {
			const key = record[PRIKEY_ALIAS];
			tableRecords[key] = record;
			return tableRecords;
		}, state[tableId] || {}),
	};

	// if (parentTableId && parentRecordId && newState[parentTableId]) {
	// 	newState[parentTableId] = {
	// 		...newState[parentTableId],
	// 		[parentRecordId]: {
	// 			...newState[parentTableId][parentRecordId],
	// 			__childrenAreLoaded: {
	// 				...newState[parentTableId][parentRecordId].__childrenAreLoaded,
	// 				[tableId]: true,
	// 			},
	// 		},
	// 	};
	// }

	// console.log(newState);
	return newState;
}

function removeRecords(state, data) {
	// console.log(action.data);
	if (!data.records) return state;

	return data.records.reduce((carry, record) => {
		const { tableId, recordId } = record;
		const tableRecords = { ...carry[tableId] };
		delete tableRecords[recordId];
		carry[tableId] = tableRecords;
		return carry;
	}, { ...state });
}

/**
	Bien que pas idéal, les infos reçues doivent comporter quelques infos de structure (table name, prikey, parent field, etc.) qui, bien que théoriquement disponibles dans un autre state, sont inclus au action data, même si ça ajoute de la complexité à l'action.
*/

function childrenAreLoaded(state = {}, action) {
	switch (action.type) {
	case 'UNAUTHORIZED':
		return {};
	case 'RECEIVE_RECORD':
		if (!action.data || !action.data.parentTableId || !action.data.parentRecordId) return state;
		const { parentTableId, parentRecordId, tableId } = action.data;
		// console.log(parentTableId, parentRecordId, tableId);
		const newState = {
			...state,
			[parentTableId]: {
				...state[parentTableId],
			},
		};

		newState[parentTableId][parentRecordId] = {
			...newState[parentTableId][parentRecordId],
		};
		newState[parentTableId][parentRecordId][tableId] = !!action.data.records;

		// console.log(newState);
		return newState;
	case 'SAVE_RECORD_SUCCESS':
		//m fonction que pour les records eux meme (structure fonctionne)
		return removeRecords(state, action.data);
	case 'CLEAR_DATA':
		return {};
	default:
		// console.log('no change');
		return state;
	}
}


function records(state = {}, action) {
	switch (action.type) {
	case 'UNAUTHORIZED':
		return {};
	case 'RECEIVE_RECORD':
		return receiveRecord(state, action.data);
	case 'SET_FIELD_VALUE':
		return setFieldValue(state, action.data);
	case 'CLEAR_DATA':
		return {};
	case 'SAVE_RECORD_SUCCESS':
		// console.log(action);
		return removeRecords(state, action.data);
	default:
		// console.log('no change');
		return state;
	}
}

// garde les records tels que loadés de la db, sans alteration (donc ne repond pas au set field value)
function recordsUnaltered(state = {}, action) {
	switch (action.type) {
	case 'UNAUTHORIZED':
		return {};
	case 'RECEIVE_RECORD':
		return receiveRecord(state, action.data);
	case 'CLEAR_DATA':
		return {};
	case 'SAVE_RECORD_SUCCESS':
		// console.log(action);
		return removeRecords(state, action.data);
	default:
		// console.log('no change');
		return state;
	}
}

function shownRecords(state = {}, action) {
	switch (action.type) {
	case 'SET_SHOWN_RECORD':
		const tableId = action.data.tableId;
		// console.log(action);
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
	recordsUnaltered,
	childrenAreLoaded,
	shownRecords,
});

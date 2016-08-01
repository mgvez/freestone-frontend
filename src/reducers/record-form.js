import { combineReducers } from 'redux';

import { PRIKEY_ALIAS, DELETED_PSEUDOFIELD_ALIAS, LOADED_TIME_ALIAS } from 'freestone/schemaProps';
import { UNAUTHORIZED } from 'actions/auth';
import { CLEAR_DATA } from 'actions/dev';
import { SET_FIELD_VALUE, SET_SHOWN_RECORD, RECEIVE_RECORD, SET_RECORD_DELETED, RECEIVE_MTM_RECORDS, TOGGLE_MTM_VALUE, CANCEL_EDIT_RECORD } from 'actions/record';
import { SAVE_RECORD_SUCCESS, DELETE_RECORD_SUCCESS } from 'actions/save';

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
	// console.log(data);
	if (!data || !data.tables) return state;

	const newState = data.tables.reduce((bldState, singleTable) => {
		if (!singleTable.tableId || !singleTable.records) return bldState;
		const { tableId } = singleTable;
		bldState[tableId] = singleTable.records.reduce((tableRecords, record) => {
			const key = record[PRIKEY_ALIAS];
			record[LOADED_TIME_ALIAS] = new Date().getTime() / 1000;
			tableRecords[key] = record;
			return tableRecords;
		}, bldState[tableId] || {});
		return bldState;
	}, {
		...state,
	});

	return newState;
}

function removeRecords(state, recordsToRemove) {
	if (!recordsToRemove) return state;

	return recordsToRemove.reduce((carry, record) => {
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
	case UNAUTHORIZED:
		return {};
	case RECEIVE_MTM_RECORDS:
	case RECEIVE_RECORD: {
		if (!action.data || !action.data.tables) return state;

		const newState = action.data.tables.reduce((bldState, tableRecords) => {
			if (!tableRecords.parentTableId || !tableRecords.parentRecordId) return bldState;
			const { parentTableId, parentRecordId, tableId } = tableRecords;
			bldState[parentTableId] = {
				...bldState[parentTableId],
			};

			bldState[parentTableId][parentRecordId] = {
				...bldState[parentTableId][parentRecordId],
			};
			bldState[parentTableId][parentRecordId][tableId] = !!tableRecords.records;
			return bldState;
		}, {
			...state,
		});
		// console.log(newState);
		return newState;
	}
	case CANCEL_EDIT_RECORD:
	case SAVE_RECORD_SUCCESS:
	case DELETE_RECORD_SUCCESS:
		//m fonction que pour les records eux meme (structure fonctionne)
		return removeRecords(state, action.data.records);
	case CLEAR_DATA:
		return {};
	default:
		// console.log('no change');
		return state;
	}
}


function records(state = {}, action) {
	switch (action.type) {
	case UNAUTHORIZED:
		return {};
	case RECEIVE_RECORD:
		return receiveRecord(state, action.data);
	case SET_RECORD_DELETED:
		return setFieldValue(state, { ...action.data, fieldId: DELETED_PSEUDOFIELD_ALIAS, val: true });
	case SET_FIELD_VALUE:
		return setFieldValue(state, action.data);
	case CLEAR_DATA:
		return {};
	case CANCEL_EDIT_RECORD:
	case SAVE_RECORD_SUCCESS:
	case DELETE_RECORD_SUCCESS:
		// console.log(action.data);
		return removeRecords(state, action.data.records);
	default:
		// console.log('no change');
		return state;
	}
}

function toggleMtmValue(state, data) {
	const { tableId, parentTableId, parentRecordId, optionId } = data;
	// console.log(tableId, parentTableId, parentRecordId, optionId);

	const siblMtmRecords = (state[tableId] && state[tableId][parentTableId] && state[tableId][parentTableId][parentRecordId] && [...state[tableId][parentTableId][parentRecordId]]) || [];
	const idx = siblMtmRecords.indexOf(optionId);
	if (idx === -1) {
		siblMtmRecords.push(optionId);
	} else {
		siblMtmRecords.splice(idx, 1);
	}
	// console.log(mtmrecords);
	return {
		...state,
		[tableId]: {
			...state[tableId],
			[parentTableId]: {
				...state[tableId][parentTableId],
				[parentRecordId]: siblMtmRecords,
			},
		},
	};
}

function receiveMtmRecords(state, data) {
	// console.log(data);
	if (!data || !data.parentTableId || !data.parentRecordId) return state;

	const { tableId, parentTableId, parentRecordId } = data;
	const newState = {
		...state,
		[tableId]: {
			...state[tableId],
		},
	};
	newState[tableId][parentTableId] = {
		...newState[tableId][parentTableId],
	};
	newState[tableId][parentTableId][parentRecordId] = data.records;
	// console.log(newState);
	return newState;
}

//les records many to many ne sont pas identifiés par leur table elle même, mais sont deletes quand leur PARENT est savé
function removeMtmRecords(state, recordsToRemove) {
	if (!recordsToRemove) return state;

	return recordsToRemove.reduce((allMtm, savedRecord) => {
		const { tableId, recordId } = savedRecord;
		//trouve une table qui aurait celle-ci comme parent
		return Object.keys(allMtm).reduce((updatedMtm, mtmTableId) => {

			if (updatedMtm[mtmTableId] && updatedMtm[mtmTableId][tableId] && updatedMtm[mtmTableId][tableId][recordId]) {

				const newMtm = {
					...updatedMtm,
					[mtmTableId]: {
						...updatedMtm[mtmTableId],
						[tableId]: {
							...updatedMtm[mtmTableId][tableId],
						},
					},
				};
				delete newMtm[mtmTableId][tableId][recordId];
				return newMtm;

			}

			return updatedMtm;

		}, allMtm);

	}, state);
}


function mtmRecords(state = {}, action) {
	switch (action.type) {
	case UNAUTHORIZED:
		return {};
	case RECEIVE_MTM_RECORDS:
		return receiveMtmRecords(state, action.data);
	case TOGGLE_MTM_VALUE:
		return toggleMtmValue(state, action.data);
	case CLEAR_DATA:
		return {};
	case CANCEL_EDIT_RECORD:
	case SAVE_RECORD_SUCCESS:
		return removeMtmRecords(state, action.data.records);
	default:
		// console.log('no change');
		return state;
	}
}

// garde les records tels que loadés de la db, sans alteration (donc ne repond pas au set field value)
function recordsUnaltered(state = {}, action) {
	switch (action.type) {
	case UNAUTHORIZED:
		return {};
	case RECEIVE_RECORD:
		return receiveRecord(state, action.data);
	case RECEIVE_MTM_RECORDS:
		return receiveMtmRecords(state, action.data);
	case CLEAR_DATA:
		return {};
	case CANCEL_EDIT_RECORD:
	case SAVE_RECORD_SUCCESS:
	case DELETE_RECORD_SUCCESS:
		// console.log(action);
		return removeRecords(state, action.data.records);
	default:
		// console.log('no change');
		return state;
	}
}

function shownRecords(state = {}, action) {
	switch (action.type) {
	case SET_SHOWN_RECORD: {
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
	}
	default:
		return state;
	}
}

export default combineReducers({
	records,
	mtmRecords,
	recordsUnaltered,
	childrenAreLoaded,
	shownRecords,
});

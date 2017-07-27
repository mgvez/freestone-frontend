import { combineReducers } from 'redux';

import { PRIKEY_ALIAS, DELETED_PSEUDOFIELD_ALIAS, LOADED_TIME_ALIAS, EDITED_PSEUDOFIELD_ALIAS, TYPE_MTM } from '../freestone/schemaProps';
import { UNAUTHORIZED, LOGOUT_API } from '../actions/auth';
import { TOGGLE_SITE_PERMISSION } from '../actions/permissions';
import { CLEAR_DATA } from '../actions/dev';
import { SET_FIELD_VALUE, SET_SHOWN_RECORD, RECORD_SINGLE_API, SET_RECORD_DELETED, MTM_RECORD_API, TOGGLE_MTM_VALUE, CANCEL_EDIT_RECORD } from '../actions/record';
import { SAVE_RECORD_API, DELETE_RECORD_API } from '../actions/save';


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
change la valeur d'un champ (lors de l'édition par user)
*/
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
				[EDITED_PSEUDOFIELD_ALIAS]: true,
			},
		},
	};
}

/**
Receive un record de la DB
*/
function receiveRecord(state, data) {
	// console.log(data);
	if (!data || !data.tables) return state;

	const newState = data.tables.reduce((bldState, singleTable) => {
		if (!singleTable.tableId || !singleTable.records) return bldState;
		const { tableId, tableType } = singleTable;
		
		//doit se faire uniquement pour les tables NON mtm. Normalement, les records mtm sont recus par une action spécifique, mais quand on duplicate les records, tous les recs sont dans le même call api
		if (tableType === TYPE_MTM) return bldState;

		bldState[tableId] = singleTable.records.reduce((tableRecords, record) => {
			const key = record[PRIKEY_ALIAS];
			record[LOADED_TIME_ALIAS] = new Date().getTime() / 1000;
			record[EDITED_PSEUDOFIELD_ALIAS] = false;
			tableRecords[key] = record;
			return tableRecords;
		}, bldState[tableId] || {});
		return bldState;
	}, {
		...state,
	});

	return newState;
}

function toggleMainEditedFromMtm(state, data) {
	const { parentTableId, parentRecordId } = data;
	return {
		...state,
		[parentTableId]: {
			...state[parentTableId],
			[parentRecordId]: {
				...state[parentTableId][parentRecordId],
				[EDITED_PSEUDOFIELD_ALIAS]: true,
			},
		},
	};
}

/**
	Bien que pas idéal, les infos reçues doivent comporter quelques infos de structure (table name, prikey, parent field, etc.) qui, bien que théoriquement disponibles dans un autre state, sont inclus au action data, même si ça ajoute de la complexité à l'action.
*/

function childrenAreLoaded(state = {}, action) {
	switch (action.type) {
	case UNAUTHORIZED:
		return {};
	case MTM_RECORD_API.SUCCESS:
	case RECORD_SINGLE_API.SUCCESS: {
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
	case SAVE_RECORD_API.SUCCESS:
	case DELETE_RECORD_API.SUCCESS:
		//m fonction que pour les records eux meme (structure fonctionne)
		return removeRecords(state, action.data.records);
	case CLEAR_DATA:
	case LOGOUT_API.SUCCESS:
		return {};
	default:
		// console.log('no change');
		return state;
	}
}

function setRecordIsEdited(state, data) {
	const { tableId, recordId } = data;
	if (
		!state[tableId]
		|| !state[tableId][recordId]
		|| state[tableId][recordId][EDITED_PSEUDOFIELD_ALIAS] === true
	) return state;
	return {
		...state,
		[tableId]: {
			...state[tableId],
			[recordId]: {
				...state[tableId][recordId],
				[EDITED_PSEUDOFIELD_ALIAS]: true,
			},
		},
	};
}

function records(state = {}, action) {
	switch (action.type) {
	case UNAUTHORIZED:
		return {};
	case RECORD_SINGLE_API.SUCCESS:
		return receiveRecord(state, action.data);
	case SET_RECORD_DELETED:
		return setFieldValue(state, { ...action.data, fieldId: DELETED_PSEUDOFIELD_ALIAS, val: true });
	case SET_FIELD_VALUE:
		return setFieldValue(state, action.data);
	case CLEAR_DATA:
	case LOGOUT_API.SUCCESS:
		return {};
	case TOGGLE_MTM_VALUE:
		return toggleMainEditedFromMtm(state, action.data);
	case CANCEL_EDIT_RECORD:
	case SAVE_RECORD_API.SUCCESS:
	case DELETE_RECORD_API.SUCCESS:
		// console.log(action.data);
		return removeRecords(state, action.data.records);
	case TOGGLE_SITE_PERMISSION:
		return setRecordIsEdited(state, action.data);
	default:
		// console.log('no change');
		return state;
	}
}

function toggleMtmValue(state, data) {
	const { tableId, parentTableId, parentRecordId, optionId } = data;
	// console.log(tableId, parentTableId, parentRecordId, optionId);
	// console.log(state);
	const siblMtmRecords = (state[tableId] && state[tableId][parentTableId] && state[tableId][parentTableId][parentRecordId] && [...state[tableId][parentTableId][parentRecordId]]) || [];
	const idx = siblMtmRecords.indexOf(optionId);
	if (idx === -1) {
		siblMtmRecords.push(optionId);
	} else {
		siblMtmRecords.splice(idx, 1);
	}
	// console.log(mtmrecords);
	const cousinMtmRecords = state[tableId] && state[tableId][parentTableId] || {};
	return {
		...state,
		[tableId]: {
			...state[tableId],
			[parentTableId]: {
				...cousinMtmRecords,
				[parentRecordId]: siblMtmRecords,
			},
		},
	};
}

function receiveMtmRecords(state, data) {
	// console.log(data);
	if (!data || !data.tables) return state;

	return data.tables.reduce((transformedState, table) => {
		if (!table.parentTableId || !table.parentRecordId) return transformedState;

		const { tableId, parentTableId, parentRecordId, tableType } = table;
		//doit se faire uniquement pour les tables de type mtm. Normalement, les records mtm sont recus par une action spécifique, mais quand on duplicate les records, tous les recs sont dans le même call api, donc on ne repond pas spécifiquement a une action receive MTM
		if (tableType !== TYPE_MTM) return transformedState;
		const newState = {
			...transformedState,
			[tableId]: {
				...transformedState[tableId],
			},
		};
		newState[tableId][parentTableId] = {
			...newState[tableId][parentTableId],
		};
		newState[tableId][parentTableId][parentRecordId] = table.records;
		// console.log(newState);
		return newState;
	}, state);
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
	case MTM_RECORD_API.SUCCESS:
	case RECORD_SINGLE_API.SUCCESS:
		return receiveMtmRecords(state, action.data);
	case TOGGLE_MTM_VALUE:
		return toggleMtmValue(state, action.data);
	case CLEAR_DATA:
	case LOGOUT_API.SUCCESS:
		return {};
	case CANCEL_EDIT_RECORD:
	case SAVE_RECORD_API.SUCCESS:
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
	case RECORD_SINGLE_API.SUCCESS:
		return receiveRecord(state, action.data);
	case MTM_RECORD_API.SUCCESS:
		return receiveMtmRecords(state, action.data);
	case CLEAR_DATA:
	case LOGOUT_API.SUCCESS:
		return {};
	case CANCEL_EDIT_RECORD:
	case SAVE_RECORD_API.SUCCESS:
	case DELETE_RECORD_API.SUCCESS:
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

import { combineReducers } from 'redux';

import { PRIKEY_ALIAS, DELETED_PSEUDOFIELD_ALIAS, LOADED_TIME_ALIAS, PREVIEW_EDITED_PSEUDOFIELD_ALIAS, EDITED_PSEUDOFIELD_ALIAS, PREVIEWID_PSEUDOFIELD_ALIAS, TYPE_MTM } from '../freestone/SchemaProps';
import { UNAUTHORIZED, LOGOUT_API } from '../actions/auth';
import { TOGGLE_SITE_PERMISSION } from '../actions/permissions';
import { CLEAR_DATA } from '../actions/dev';
import { SET_FIELD_VALUE, SET_SHOWN_RECORD, RECORD_SINGLE_API, SET_RECORD_DELETED, MTM_RECORD_API, TOGGLE_MTM_VALUE, CANCEL_EDIT_RECORD } from '../actions/record';
import { SAVE_RECORD_API, SAVE_PREVIEW_API, DELETE_RECORD_API } from '../actions/save';


function removeRecords(state, recordsToRemove) {
	if (!recordsToRemove) return state;
	return recordsToRemove.reduce((carry, record) => {
		//when getting records from the database, the original record is either the db id OR the temp id if it was a new record. We need to remove that one, as the records on the front are referred to by their temp id until they are saved.
		const { tableId, recordId, recordOriginalId } = record;
		const finalRecordId = recordOriginalId || recordId;
		const tableRecords = { ...carry[tableId] };
		delete tableRecords[finalRecordId];
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
				[PREVIEW_EDITED_PSEUDOFIELD_ALIAS]: true,
			},
		},
	};
}

function receivePreviewIds(state, savedRecords) {

	if (!savedRecords) return state;

	return savedRecords.reduce((builtState, savedRecord) => {
		const { tableId, recordOriginalId, recordId } = savedRecord;
		// console.log(savedRecord);

		//if we are saving a preview over a preview, there won't be a record in state for recordId, since recordId IS a preview
		if (!builtState[tableId][recordOriginalId]) return builtState;

		const editedRecord = { ...builtState[tableId][recordOriginalId] };
		editedRecord[PREVIEWID_PSEUDOFIELD_ALIAS] = recordId;
		editedRecord[PREVIEW_EDITED_PSEUDOFIELD_ALIAS] = false;
		builtState[tableId] = {
			...builtState[tableId],
			[recordOriginalId]: editedRecord,
		};
		return builtState;
	}, { ...state });

}

/**
Receive un record de la DB
*/
function receiveRecord(state, data) {
	// console.log(data);
	if (!data || !data.tables) return state;

	const newState = data.tables.reduce((builtState, singleTable) => {
		if (!singleTable.tableId || !singleTable.records) return builtState;
		const { tableId, tableType } = singleTable;
		
		//doit se faire uniquement pour les tables NON mtm. Normalement, les records mtm sont recus par une action spécifique, mais quand on duplicate les records, tous les recs sont dans le même call api
		if (tableType === TYPE_MTM) return builtState;

		builtState[tableId] = singleTable.records.reduce((tableRecords, record) => {
			const key = record[PRIKEY_ALIAS];
			record[LOADED_TIME_ALIAS] = new Date().getTime() / 1000;
			record[EDITED_PSEUDOFIELD_ALIAS] = record[EDITED_PSEUDOFIELD_ALIAS] || false;
			record[PREVIEW_EDITED_PSEUDOFIELD_ALIAS] = record[PREVIEW_EDITED_PSEUDOFIELD_ALIAS] || false;
			tableRecords[key] = record;
			return tableRecords;
		}, builtState[tableId] || {});
		return builtState;
	}, {
		...state,
	});

	return newState;
}

function toggleMainEditedFromMtm(state, data) {
	// console.log(data);
	const { parentTableId, parentRecordId } = data;
	return {
		...state,
		[parentTableId]: {
			...state[parentTableId],
			[parentRecordId]: {
				...state[parentTableId][parentRecordId],
				[EDITED_PSEUDOFIELD_ALIAS]: true,
				[PREVIEW_EDITED_PSEUDOFIELD_ALIAS]: true,
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

		const newState = action.data.tables.reduce((builtState, tableRecords) => {
			if (!tableRecords.parentTableId || !tableRecords.parentRecordId) return builtState;
			const { parentTableId, parentRecordId, tableId } = tableRecords;
			builtState[parentTableId] = {
				...builtState[parentTableId],
			};

			builtState[parentTableId][parentRecordId] = {
				...builtState[parentTableId][parentRecordId],
			};
			builtState[parentTableId][parentRecordId][tableId] = !!tableRecords.records;
			return builtState;
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
	case CLEAR_DATA:
	case LOGOUT_API.SUCCESS:
		return {};
	case RECORD_SINGLE_API.SUCCESS:
		return receiveRecord(state, action.data);
	case SET_RECORD_DELETED:
		return setFieldValue(state, { ...action.data, fieldId: DELETED_PSEUDOFIELD_ALIAS, val: true });
	case SET_FIELD_VALUE:
		return setFieldValue(state, action.data);
	case TOGGLE_MTM_VALUE:
		return toggleMainEditedFromMtm(state, action.data);
	case CANCEL_EDIT_RECORD:
	case SAVE_RECORD_API.SUCCESS:
	case DELETE_RECORD_API.SUCCESS:
		return removeRecords(state, action.data.records);
	case SAVE_PREVIEW_API.SUCCESS:
		return receivePreviewIds(state, action.data.records);
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

function lastEdit(state = { time: 0 }, action) {
	switch (action.type) {
	case TOGGLE_MTM_VALUE:
	case SET_RECORD_DELETED:
	case SET_FIELD_VALUE:
	case CLEAR_DATA: {
		return {
			...state,
			time: new Date().getTime(),
		};
	}
	default:
		return state;
	}
}

function shownRecords(state = {}, action) {
	switch (action.type) {
	case SET_SHOWN_RECORD: {
		const { tableId, parentRecordId, recordId, language } = action.data;
		// console.log(action);
		const newState = {
			...state,
			[tableId]: {
				...(state[tableId] || {}),
				[parentRecordId]: language ? {
					...((state[tableId] && state[tableId][parentRecordId]) || {}),
					[language]: recordId,
				} : recordId,
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
	lastEdit,
});

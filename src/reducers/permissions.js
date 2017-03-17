import { combineReducers } from 'redux';

import { UNAUTHORIZED, LOGOUT_SUCCESS } from 'actions/auth';
import { CLEAR_DATA } from 'actions/dev';
import { SAVE_RECORD_SUCCESS, DELETE_RECORD_SUCCESS } from 'actions/save';
import { RECEIVE_SITE_PERMISSIONS, RECEIVE_USER_GROUPS } from 'actions/permissions';

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

function singleTableRecords(state, singleTable) {
	if (!singleTable.tableId || !singleTable.permissions) return state;
	const { tableId, recordId, permissions } = singleTable;
	
	state[tableId] = {
		...state[tableId],
		[recordId]: permissions,
	};
	return state;
}

function sitePermissions(state = {}, action) {
	// console.log(action);
	switch (action.type) {
	case UNAUTHORIZED:
	case LOGOUT_SUCCESS:
	case CLEAR_DATA:
		// console.log('clear');
		return {};
	case SAVE_RECORD_SUCCESS:
	case DELETE_RECORD_SUCCESS:
		return removeRecords(state, action.data.records);
	case RECEIVE_SITE_PERMISSIONS:
		// console.log(action);
		return singleTableRecords(state, action.data);
	default:
		return state;
	}
}

function groups(state = [], action) {
	// console.log(action);
	switch (action.type) {
	case UNAUTHORIZED:
	case LOGOUT_SUCCESS:
	case CLEAR_DATA:
		// console.log('clear');
		return null;
	case SAVE_RECORD_SUCCESS:
	case DELETE_RECORD_SUCCESS:
		return null;
	case RECEIVE_USER_GROUPS:
		// console.log(action);
		return action.data;
	default:
		return state;
	}
}


export default combineReducers({
	sitePermissions,
	groups,
});

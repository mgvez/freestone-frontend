import { combineReducers } from 'redux';

import { UNAUTHORIZED, LOGOUT_SUCCESS } from '../actions/auth';
import { CLEAR_DATA } from '../actions/dev';
import { SAVE_RECORD_SUCCESS, DELETE_RECORD_SUCCESS } from '../actions/save';
import { RECEIVE_SITE_PERMISSIONS, RECEIVE_USER_GROUPS, TOGGLE_SITE_PERMISSION, SAVE_SITE_PERMISSIONS } from '../actions/permissions';

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

function singleTableRecords(state, data) {
	// console.log(state, data);
	const { tableId, recordId } = data;
	let { permissions } = data;
	if (!tableId || !recordId) return state;
	if (!permissions) {
		const { groupId, val } = data;
		permissions = state[tableId] && state[tableId][recordId] && [...state[tableId][recordId]];
		// console.log(permissions);
		const permIndex = permissions.indexOf(groupId);
		if (~permIndex) permissions.splice(permIndex, 1);
		
		if (val) permissions.push(groupId);
	}
	// console.log(permissions);

	return { 
		...state,
		[tableId]: {
			...state[tableId],
			[recordId]: permissions,
		},
	};
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
	case TOGGLE_SITE_PERMISSION:
	case RECEIVE_SITE_PERMISSIONS:
	case SAVE_SITE_PERMISSIONS:
		return singleTableRecords(state, action.data);
	default:
		return state;
	}
}

function sitePermissionsModified(state = {}, action) {
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
	case SAVE_SITE_PERMISSIONS:
		return removeRecords(state, [action.data]);
	case TOGGLE_SITE_PERMISSION: {
		const { tableId, recordId } = action.data;
		return { 
			...state,
			[tableId]: {
				...state[tableId],
				[recordId]: true,
			},
		};
	}
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
	sitePermissionsModified,
	groups,
});

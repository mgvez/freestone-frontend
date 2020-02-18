import { combineReducers } from 'redux';

import { UNAUTHORIZED, LOGOUT_API } from '../actions/auth';
import { CLEAR_DATA } from '../actions/dev';
import { SAVE_RECORD_API, DELETE_RECORD_API } from '../actions/save';
import { SITE_PERMISSIONS_API, USER_GROUPS_API, TOGGLE_SITE_PERMISSION, SAVE_SITE_PERMISSIONS_API } from '../actions/permissions';

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
	case LOGOUT_API.SUCCESS:
	case LOGOUT_API.REQUEST:
	case CLEAR_DATA:
		// console.log('clear');
		return {};
	case SAVE_RECORD_API.SUCCESS:
	case DELETE_RECORD_API.SUCCESS:
		return removeRecords(state, action.data.records);
	case TOGGLE_SITE_PERMISSION:
	case SITE_PERMISSIONS_API.SUCCESS:
	case SAVE_SITE_PERMISSIONS_API.SUCCESS:
		return singleTableRecords(state, action.data);
	default:
		return state;
	}
}

function sitePermissionsModified(state = {}, action) {
	// console.log(action);
	switch (action.type) {
	case UNAUTHORIZED:
	case LOGOUT_API.SUCCESS:
	case LOGOUT_API.REQUEST:
	case CLEAR_DATA:
		// console.log('clear');
		return {};
	case SAVE_RECORD_API.SUCCESS:
	case DELETE_RECORD_API.SUCCESS:
		return removeRecords(state, action.data.records);
	case SITE_PERMISSIONS_API.SUCCESS:
	case SAVE_SITE_PERMISSIONS_API.SUCCESS:
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
	case LOGOUT_API.SUCCESS:
	case LOGOUT_API.REQUEST:
	case CLEAR_DATA:
		// console.log('clear');
		return null;
	case SAVE_RECORD_API.SUCCESS:
	case DELETE_RECORD_API.SUCCESS:
		return null;
	case USER_GROUPS_API.SUCCESS:
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

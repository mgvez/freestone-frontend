import { FREESTONE_API, FREESTONE_API_FAILURE } from '../middleware/api';

export const RECEIVE_SITE_PERMISSIONS = 'RECEIVE_SITE_PERMISSIONS';
export const TOGGLE_SITE_PERMISSION = 'TOGGLE_SITE_PERMISSION';
export const RECEIVE_USER_GROUPS = 'RECEIVE_USER_GROUPS';
export const SAVE_SITE_PERMISSIONS = 'SAVE_SITE_PERMISSIONS';


export function fetchSitePermissions(tableId, recordId) {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: ['api::fetch-site-perms', RECEIVE_SITE_PERMISSIONS, FREESTONE_API_FAILURE],
				route: `sitePermissions/record/${tableId}/${recordId}`,
			},
		});
	};
}

export function fetchUsergroups() {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: ['api::fetch-user-groups', RECEIVE_USER_GROUPS, FREESTONE_API_FAILURE],
				route: 'sitePermissions/groups',
			},
		});
	};
}


export function savePermissions(tableId, recordId, values) {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: ['api::save-site-permissions', SAVE_SITE_PERMISSIONS, FREESTONE_API_FAILURE],
				route: `sitePermissions/save/${tableId}/${recordId}`,
				data: {
					values,
				},
			},
		});
	};
}


export function toggleRecordPermission(tableId, recordId, groupId, val) {
	return (dispatch) => {
		return dispatch({
			type: TOGGLE_SITE_PERMISSION,
			data: {
				tableId,
				recordId,
				groupId,
				val,
			},
		});
	};
}

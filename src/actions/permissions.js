import { FREESTONE_API } from '../middleware/api';
import { createRequestTypes } from './apiAction';

export const TOGGLE_SITE_PERMISSION = 'TOGGLE_SITE_PERMISSION';


export const SITE_PERMISSIONS_API = createRequestTypes('SITE_PERMISSIONS_API');
export const USER_GROUPS_API = createRequestTypes('USER_GROUPS_API');
export const SAVE_SITE_PERMISSIONS_API = createRequestTypes('SAVE_SITE_PERMISSIONS_API');



export function fetchSitePermissions(tableId, recordId) {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: SITE_PERMISSIONS_API,
				route: `sitePermissions/record/${tableId}/${recordId}`,
			},
		});
	};
}

export function fetchUsergroups() {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: USER_GROUPS_API,
				route: 'sitePermissions/groups',
			},
		});
	};
}


export function savePermissions(tableId, recordId, values) {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: SAVE_SITE_PERMISSIONS_API,
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

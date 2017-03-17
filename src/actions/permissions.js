import { FREESTONE_API, FREESTONE_API_FAILURE } from 'middleware/api';

export const RECEIVE_SITE_PERMISSIONS = 'RECEIVE_SITE_PERMISSIONS';
export const RECEIVE_USER_GROUPS = 'RECEIVE_USER_GROUPS';


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

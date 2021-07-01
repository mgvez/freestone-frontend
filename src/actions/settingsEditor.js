
import { FREESTONE_API } from '../middleware/api';
import { createRequestTypes } from './apiAction';
export const CLEAR_SETTINGS = 'CLEAR_SETTINGS';
export const EDIT_SETTINGS = 'EDIT_SETTINGS';
export const ACTIVATE_SETTINGS_GROUP = 'ACTIVATE_SETTINGS_GROUP';
export const FETCH_SETTINGS_API = createRequestTypes('FETCH_SETTINGS_API');
export const CLOSE_SETTINGS_API = createRequestTypes('CLOSE_SETTINGS_API');


export function fetchSettingsEditorData() {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: FETCH_SETTINGS_API,
				route: 'settings/getData',
			},
		});
	};
}

export function closeSettings() {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: CLOSE_SETTINGS_API,
				route: 'settings/unlock',
			},
		});
	};
}

export function clearSettings() {
	return (dispatch) => {
		return dispatch({
			type: CLEAR_SETTINGS,
		});
	};
}

export function editSettings(namespace, key, value) {
	return (dispatch) => {
		return dispatch({
			type: EDIT_SETTINGS,
			data: {
				namespace,
				key,
				value,
			},
		});
	};
}

export function setActiveGroup(key) {
	return (dispatch) => {
		return dispatch({
			type: ACTIVATE_SETTINGS_GROUP,
			data: {
				key,
			},
		});
	};
}


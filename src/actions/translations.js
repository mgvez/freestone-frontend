import { FREESTONE_API } from '../middleware/api';
import { createRequestTypes } from './apiAction';

export const EDIT_TRANSLATION = 'EDIT_TRANSLATION';
export const SEARCH_TRANSLATIONS = 'SEARCH_TRANSLATIONS';
export const CLEAR_TRANSLATIONS = 'CLEAR_TRANSLATIONS';
export const NAVIGATE_SEARCH_TRANSLATIONS = 'NAVIGATE_SEARCH_TRANSLATIONS';
export const NAVIGATE_TRANSLATIONS_GROUPS = 'NAVIGATE_TRANSLATIONS_GROUPS';

export const TRANSLATIONS_API = createRequestTypes('TRANSLATIONS_API');
export const SAVE_TRANSLATIONS_API = createRequestTypes('SAVE_TRANSLATIONS_API');
export const CLOSE_TRANSLATIONS_API = createRequestTypes('CLOSE_TRANSLATIONS_API');


export function fetchTranslations(lang) {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: TRANSLATIONS_API,
				route: `translations/getKeys/${lang}`,
			},
		});
	};
}

export function editTranslation(language, key, value) {
	return (dispatch) => {
		return dispatch({
			type: EDIT_TRANSLATION,
			data: {
				language,
				key,
				value,
			},
		});
	};
}


export function saveTranslations(translations) {
	// console.log(translations);
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: SAVE_TRANSLATIONS_API,
				route: 'translations/save',
				data: {
					translations,
				},
			},
		});
	};
}

export function closeTranslations() {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: CLOSE_TRANSLATIONS_API,
				route: 'translations/unlock',
			},
		});
	};
}

export function searchTranslations(searchVal) {
	return (dispatch) => {
		return dispatch({
			type: SEARCH_TRANSLATIONS,
			data: {
				searchVal,
			},
		});
	};
}

export function navigateSearchTranslation(direction) {
	return (dispatch) => {
		return dispatch({
			type: NAVIGATE_SEARCH_TRANSLATIONS,
			data: {
				direction,
			},
		});
	};
}

export function navigateTranslationsGroups(groupIdx) {
	return (dispatch) => {
		return dispatch({
			type: NAVIGATE_TRANSLATIONS_GROUPS,
			data: {
				groupIdx,
			},
		});
	};
}


export function clearTranslations() {
	return (dispatch) => {
		return dispatch({
			type: CLEAR_TRANSLATIONS,
		});
	};
}

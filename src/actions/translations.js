import { FREESTONE_API } from '../middleware/api';
import { createRequestTypes } from './apiAction';

export const EDIT_TRANSLATION = 'EDIT_TRANSLATION';

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


import { FREESTONE_API, FREESTONE_API_FATAL_FAILURE } from 'middleware/api';
export const SET_TRANSLATIONS = 'SET_TRANSLATIONS';
export const SET_PLACED_TRANSLATIONS = 'SET_PLACED_TRANSLATIONS';
export const EDIT_TRANSLATION = 'EDIT_TRANSLATION';
export const SAVE_TRANSLATIONS = 'SAVE_TRANSLATIONS';

export function fetchTranslations(lang) {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: [`api::fetch-translations ${lang}`, SET_TRANSLATIONS, FREESTONE_API_FATAL_FAILURE],
				route: `translations/getKeys/${lang}`,
			},
		});
	};
}

export function fetchPlacedTranslations() {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: ['api::fetch-placed-translations', SET_PLACED_TRANSLATIONS, FREESTONE_API_FATAL_FAILURE],
				route: 'translations/getFromTemplates',
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
				types: ['api::save-translations', SAVE_TRANSLATIONS, FREESTONE_API_FATAL_FAILURE],
				route: 'translations/save',
				data: translations,
			},
		});
	};
}


import { FREESTONE_API, FREESTONE_API_FATAL_FAILURE } from 'middleware/api';
export const SET_TRANSLATIONS = 'SET_TRANSLATIONS';
export const SET_PLACED_TRANSLATIONS = 'SET_PLACED_TRANSLATIONS';

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

import { FREESTONE_API } from 'middleware/api';

export const ADD_ENV = 'ADD_ENV';
export const SET_FIELD_VIEW_LANGUAGE = 'SET_FIELD_VIEW_LANGUAGE';

export function fetchEnv() {
	return (dispatch) => {
		// console.log('fetch env');
		return dispatch({
			[FREESTONE_API]: {
				types: [null, ADD_ENV, null],
				route: 'env',
			},
		});
	};
}

export function setFieldViewLanguage(lang) {
	return (dispatch) => {
		return dispatch({
			type: SET_FIELD_VIEW_LANGUAGE,
			data: lang,
		});
	};
}

import { FREESTONE_API } from 'middleware/api';

export const ADD_ENV = 'ADD_ENV';
export const SET_FIELD_VIEW_LANGUAGE = 'SET_FIELD_VIEW_LANGUAGE';
export const SET_ENV_VARIABLE = 'SET_ENV_VARIABLE';

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

export function fetchVariable(name) {
	return (dispatch) => {
		// console.log('fetch env');
		return dispatch({
			[FREESTONE_API]: {
				types: [null, SET_ENV_VARIABLE, null],
				route: `env/clientvar/${name}`,
			},
		});
	};
}

export function setVariable(name, value) {
	return (dispatch) => {
		return dispatch({
			type: SET_ENV_VARIABLE,
			data: {
				name,
				value,
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

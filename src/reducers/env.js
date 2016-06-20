
import { ADD_ENV, SET_FIELD_VIEW_LANGUAGE, ADD_CLIENT_VARIABLE } from 'actions/env';
import { CLEAR_DATA } from 'actions/dev';

const envInitialState = {
	openedFrom: '',
	clientScripts: [],
	filesDir: '',
	thumbsDir: '',
	siteName: '',
	adminPath: '',
	websitePath: '',
	clientPath: '',
	pathCss: [],
	languages: [],
};

export function env(state = envInitialState, action) {
	// console.log(action);
	switch (action.type) {
	case ADD_ENV:
		// console.log(action.data);
		const data = action.data;
		const defaults = envInitialState;
		return Object.keys(defaults).reduce((vals, key) => {
			vals[key] = data[key] || defaults[key];
			return vals;
		}, {});
	default:
		// console.log('no change');
		return state;
	}
}

const userViewSettingsInitialState = {
	language: null,
};
export function userViewSettings(state = userViewSettingsInitialState, action) {
	switch (action.type) {
	case SET_FIELD_VIEW_LANGUAGE:
		// console.log(action.data);
		return {
			...state,
			language: action.data,
		};
	default:
		// console.log('no change');
		return state;
	}
}

export function clientVariables(state = {}, action) {
	switch (action.type) {
	case CLEAR_DATA:
		return {};
	case ADD_CLIENT_VARIABLE:
		console.log(action.data);
		const { name, value } = action.data;
		return {
			...state,
			[name]: value,
		};
	default:
		// console.log('no change');
		return state;
	}
}

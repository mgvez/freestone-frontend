
import { ADD_ENV, SET_FIELD_VIEW_LANGUAGE } from 'actions/env';

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
		return action.data;
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

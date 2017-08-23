
import { LOGOUT_API } from '../actions/auth';
import { ENV_API, SET_FIELD_VIEW_LANGUAGE, ENV_VAR_API, SET_ENV_VARIABLE } from '../actions/env';
import { CLEAR_DATA } from '../actions/dev';
import { combineReducers } from 'redux';

const envInitialState = {
	openedFrom: '',
	clientScripts: [],
	filesDir: '',
	thumbsDir: '',
	siteName: '',
	adminPath: '',
	domain: '',
	clientPath: '',
	pathCss: [],
	languages: [],
	defaultLanguage: '',
};

function freestone(state = envInitialState, action) {
	// console.log(action);
	switch (action.type) {
	case ENV_API.SUCCESS: {
		// console.log(action.data);
		const data = action.data;
		const defaults = envInitialState;
		return Object.keys(defaults).reduce((vals, key) => {
			vals[key] = data[key] || defaults[key];
			return vals;
		}, {});
	}
	case CLEAR_DATA:
	case LOGOUT_API.SUCCESS:
		return envInitialState;
	default:
		// console.log('no change');
		return state;
	}
}

const userViewSettingsInitialState = {
	language: null,
};
function userViewSettings(state = userViewSettingsInitialState, action) {
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

/**
	Variables dépendant du client (e.g. Google Analytics ID)
*/
function clientVariables(state = {}, action) {
	switch (action.type) {
	case CLEAR_DATA:
	case LOGOUT_API.SUCCESS:
		return {};
	case ENV_VAR_API.SUCCESS:
	case SET_ENV_VARIABLE: {
		// console.log(action.data);
		const { name, value } = action.data;
		return {
			...state,
			[name]: value,
		};
	}
	default:
		// console.log('no change');
		return state;
	}
}

export default combineReducers({
	clientVariables,
	userViewSettings,
	freestone,
});

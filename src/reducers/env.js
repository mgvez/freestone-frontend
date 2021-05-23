
import { LOGOUT_API, UNAUTHORIZED } from '../actions/auth';
import { ENV_API, SET_LANGUAGE, TOGGLE_LANGUAGE, ENV_VAR_API, SET_ENV_VARIABLE } from '../actions/env';
import { CLEAR_DATA } from '../actions/dev';
import { combineReducers } from 'redux';

const envInitialState = {
	openedFrom: '',
	clientScripts: [],
	clientComponents: [],
	filesDir: '',
	siteName: '',
	adminPath: '',
	domain: '',
	clientPath: '',
	pathCss: [],
	htmlEditorConfig: null,
	languages: [],
	defaultLanguage: '',
	isProdEnv: false,
	version: {
		needsUpdate: false,
		latestVersion: null,
		clientVersion: null,
	},
	versionInfo: null,
	ssoAdminURL: null,
	ssoApiURL: null,
};

function freestone(state = envInitialState, action) {
	// console.log(action);
	switch (action.type) {
	case ENV_API.SUCCESS: {
		// console.log(action.data);
		const data = action.data;
		return {
			...envInitialState,
			...data,
		};
	}
	case CLEAR_DATA:
	case UNAUTHORIZED:
	case LOGOUT_API.REQUEST:
	case LOGOUT_API.SUCCESS:
		return envInitialState;
	default:
		if (action.data && action.data.version) {
			return {
				...state,
				version: {
					...state.version,
					...action.data.version,
				},
			};
		}
		return state;
	}
}

const userViewSettingsInitialState = {
	language: null,
	languages: [],
};
function userViewSettings(state = userViewSettingsInitialState, action) {
	switch (action.type) {
	case ENV_API.SUCCESS: {
		if (action.data && action.data.languages) {
			return {
				...state,
				languages: action.data.languages.map(l => l.key),
			};
		}
		return state;
	}
	case TOGGLE_LANGUAGE: {
		if (state.languages.length) {
			const currentIndex = state.languages.indexOf(state.language);
			if (currentIndex === -1) return state;
			const newLang = state.languages.length === currentIndex + 1 ? state.languages[0] : state.languages[currentIndex + 1];
			return {
				...state,
				language: newLang,
			};
		}
		return state;
	}
	case SET_LANGUAGE:
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
	case UNAUTHORIZED:
	case LOGOUT_API.SUCCESS:
		return {};
	case ENV_VAR_API.SUCCESS:
	case SET_ENV_VARIABLE: {
		if (!action.data) return state;
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

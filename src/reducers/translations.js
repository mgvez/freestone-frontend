import { combineReducers } from 'redux';

import { TRANSLATIONS_API, EDIT_TRANSLATION, SAVE_TRANSLATIONS_API, CLOSE_TRANSLATIONS_API } from '../actions/translations';
import { CLEAR_DATA } from '../actions/dev';
import { UNAUTHORIZED, LOGOUT_API } from '../actions/auth';

function translations(state = null, action) {
	switch (action.type) {
	case TRANSLATIONS_API.SUCCESS: {
		const lang = action.data.language;
		// console.log(action);

		const newState = {
			...state,
			[lang]: action.data.translations,
		};
		return newState;
	}
	case EDIT_TRANSLATION: {
		const { language, key, value } = action.data;
		if (!language) return state;
		const newState = {
			...state,
			isEdited: true,
			[language]: {
				...state[language],
				[key]: value,
			},
		};
		return newState; 
	}
	case CLEAR_DATA:
	case SAVE_TRANSLATIONS_API.SUCCESS:
	case CLOSE_TRANSLATIONS_API.SUCCESS:
	case UNAUTHORIZED:
	case LOGOUT_API.SUCCESS:
	case LOGOUT_API.REQUEST:
		return null;
	default:
		return state;
	}
}

function schema(state = [], action) {
	switch (action.type) {
	case TRANSLATIONS_API.SUCCESS: {
		return action.data.schema;
	}
	case CLEAR_DATA:
	case UNAUTHORIZED:
	case LOGOUT_API.SUCCESS:
	case LOGOUT_API.REQUEST:
		return [];
	default:
		return state;
	}
}


export default combineReducers({
	translations,
	schema,
});

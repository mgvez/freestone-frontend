import { combineReducers } from 'redux';

import { TRANSLATIONS_API, EDIT_TRANSLATION, SAVE_TRANSLATIONS_API, CLOSE_TRANSLATIONS_API } from '../actions/translations';
import { CLEAR_DATA } from '../actions/dev';

function translations(state = {}, action) {
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
		return {};
	default:
		return state;
	}
}

function schema(state = {}, action) {
	switch (action.type) {
	case TRANSLATIONS_API.SUCCESS: {
		// console.log(action);
		const newState = {
			...state,
			...action.data.schema,
		};
		return newState;
	}
	case CLEAR_DATA:
		return {};
	default:
		return state;
	}
}


export default combineReducers({
	translations,
	schema,
});

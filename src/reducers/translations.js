import { combineReducers } from 'redux';

import { SET_TRANSLATIONS, SET_PLACED_TRANSLATIONS } from 'actions/translations';
import { CLEAR_DATA } from 'actions/dev';

function translations(state = {}, action) {
	switch (action.type) {
	case SET_TRANSLATIONS: {
		const lang = action.data.language;
		// console.log(action);
		const newState = {
			...state,
			[lang]: action.data.translations,
		};
		return newState;
	}
	case CLEAR_DATA:
		return {};
	default:
		return state;
	}
}

function placedTranslations(state = null, action) {
	switch (action.type) {
	case SET_PLACED_TRANSLATIONS: {
		// console.log(action);
		return action.data;
	}
	case CLEAR_DATA:
		return null;
	default:
		return state;
	}
}


export default combineReducers({
	translations,
	placedTranslations,
});

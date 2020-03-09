import { combineReducers } from 'redux';

import { 
	NAVIGATE_SEARCH_TRANSLATIONS, 
	SEARCH_TRANSLATIONS, 
	TRANSLATIONS_API,
	EDIT_TRANSLATION,
	SAVE_TRANSLATIONS_API,
	CLOSE_TRANSLATIONS_API,
	CLEAR_TRANSLATIONS,
	NAVIGATE_TRANSLATIONS_GROUPS,
} from '../actions/translations';
import { CLEAR_DATA } from '../actions/dev';
import { UNAUTHORIZED, LOGOUT_API } from '../actions/auth';

const initial = {
	translations: null,
	searchValue: null,
	searchIndex: null,
	searchResult: null,
	activeGroup: null,
	schema: [],
};

export default function translations(state = initial, action) {
	switch (action.type) {
	case TRANSLATIONS_API.SUCCESS: {
		const lang = action.data.language;
		// console.log(action);
		const newState = {
			...state,
			translations: {
				...state.translations,
				[lang]: action.data.translations,
			},
			schema: action.data.schema,
		};
		return newState;
	}
	case EDIT_TRANSLATION: {
		const { language, key, value } = action.data;
		if (!language) return state;
		// console.log(language, key, value);
		const newState = {
			...state,
			translations: {
				...state.translations,
				isEdited: true,
				[language]: {
					...state[language],
					[key]: value,
				},
			},
		};
		// console.log(newState[language][key]);
		return newState;
	}
	case SEARCH_TRANSLATIONS: {

		//filter keys where the search key is found. DOne in selector, so that search result don't change even if we change the translations. Only thing that can change result is searching anew
		const allTranslations = state.translations;
		// console.log(searchVal);
		const { searchVal } = action.data;
		if (searchVal === state.searchValue) return state;
		if (!searchVal || !allTranslations) {
			return {
				...state,
				searchValue: null,
				searchResult: null,
			};
		}

		//get an array of all keys where serch val has been found
		const langs = Object.keys(allTranslations);
		const allFound = langs.reduce((found, lang) => {
			const langTranslations = allTranslations[lang];
			const keys = Object.keys(langTranslations);
			return keys.reduce((langFound, key) => {
				const tx = langTranslations[key];
				if (tx && ~tx.toLowerCase().indexOf(searchVal)) {
					langFound.push({ lang, key });
				}
				return langFound;
			}, found);
		}, []).sort((a, b) => {
			if (a.key < b.key) return -1;	
			if (a.key > b.key) return 1;
			if (a.lang < b.lang) return 1;
			if (a.lang > b.lang) return -1;
			return 0;
		});

		return {
			...state,
			searchValue: action.data.searchVal,
			searchResult: allFound,
			searchIndex: 0,
			activeGroup: null,
		};
	}
	case NAVIGATE_SEARCH_TRANSLATIONS: {
		const rawSearchResultIndex = state.searchIndex + action.data.direction;
		const searchIndex = rawSearchResultIndex === state.searchResult.length ? 0 : (rawSearchResultIndex < 0 ? state.searchResult.length - 1 : rawSearchResultIndex);
		
		return {
			...state,
			searchIndex,
			activeGroup: null,
		};
	}
	case NAVIGATE_TRANSLATIONS_GROUPS: {
		return {
			...state,
			activeGroup: action.data.groupIdx,
		};
	}

	case CLEAR_DATA:
	case SAVE_TRANSLATIONS_API.SUCCESS:
	case CLOSE_TRANSLATIONS_API.SUCCESS:
	case CLEAR_TRANSLATIONS:
	case UNAUTHORIZED:
	case LOGOUT_API.SUCCESS:
	case LOGOUT_API.REQUEST:
		return initial;
	default:
		return state;
	}
}

//SHARED
import { createSelector } from 'reselect';

const allTranslationsSelector = state => state.freestone.translations.translations;
const isEditedSelector = state => state.freestone.translations.isEdited;
const isLoadedSelector = state => !!state.freestone.translations.translations;
const searchResultSelector = state => state.freestone.translations.searchResult;
const searchResultIndexSelector = state => state.freestone.translations.searchIndex;
const activeGroupSelector = state => state.freestone.translations.activeGroup;
const translationsSchemaSelector = state => state.freestone.translations.schema;
const allLanguagesSelector = state => state.freestone.env.freestone.languages;

const keySelector = (state, props) => props.translationKey;
const langSelector = (state, props) => props.language;


export const languageKeysSelector = createSelector(
	[allLanguagesSelector],
	(languages) => {
		return languages.map(lang => lang.key);
	}
);

const schemaSelector = createSelector(
	[translationsSchemaSelector],
	(schema) => {
		return schema.sort((a, b) => {
			return a.groupname.localeCompare(b.groupname);
		});
	}
);


function makeSingleTranslationSelector() {
	return createSelector(
		[allTranslationsSelector, keySelector, langSelector],
		(allTranslations, key, lang) => {
			// console.log(key, lang);
			return allTranslations && allTranslations[lang] && allTranslations[lang][key];
		}
	);
}

export function singleTranslationMapStateToProps() {
	return createSelector(
		makeSingleTranslationSelector(),
		(translationValue) => {
			// console.log(translationValue);
			return {
				translationValue,
			};
		}
	);
}

const activeSearchItemSelector = createSelector(
	[searchResultSelector, searchResultIndexSelector, schemaSelector],
	(searchResult, searchIndex, schema) => {
		if (!searchResult || !searchResult.length) return null;
		const currentSearchActiveKey = searchResult[searchIndex];
		const activeGroup = schema.findIndex(schemaItem => {
			// console.log(schemaItem);
			return schemaItem.items && schemaItem.items.find(item => item.key === currentSearchActiveKey.key);
		});
		console.log(currentSearchActiveKey);
		console.log(activeGroup);

		return {
			activeGroup,
			searchIndex,
			currentSearchActiveKey,
		};
	}
);


export const coreTranslations = createSelector(
	[isEditedSelector, isLoadedSelector, languageKeysSelector, schemaSelector, searchResultSelector, activeSearchItemSelector, activeGroupSelector],
	(isEdited, isLoaded, languages, schema, searchResult, activeSearchItem, activeGroup) => {
		console.log(activeSearchItem);
		console.log(activeGroup);
		// console.log('edited...', isEdited);

		return {
			isLoaded,
			isEdited,
			languages,
			schema,
			searchResult,
			...activeSearchItem,
			activeGroup: activeGroup !== null ? activeGroup : (activeSearchItem && activeSearchItem.activeGroup),
		};
	}
);

//SHARED
import { createSelector } from 'reselect';

const allTranslationsSelector = state => state.freestone.translations && state.freestone.translations.translations;
const isEditedSelector = state => state.freestone.translations && state.freestone.translations.translations && state.freestone.translations.translations.isEdited;
const isLoadedSelector = state => state.freestone.translations && !!state.freestone.translations.translations;
const translationsSchemaSelector = state => state.freestone.translations.schema && state.freestone.translations.schema;
const allLanguagesSelector = state => state.freestone.env.freestone.languages;

const keySelector = (state, props) => props.translationKey;
const langSelector = (state, props) => props.language;


export const languageKeysSelector = createSelector(
	[allLanguagesSelector],
	(languages) => {
		return languages.map(lang => lang.key);
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

export const coreTranslations = createSelector(
	[isEditedSelector, isLoadedSelector, languageKeysSelector, translationsSchemaSelector],
	(isEdited, isLoaded, languages, schemaRaw) => {
		// console.log(schemaRaw);
		// console.log('edited...', isEdited);

		const schema = Object.keys(schemaRaw).map((key) => {
			return {
				key,
				label: schemaRaw[key].label,
				description: schemaRaw[key].description,
			};
		});
		return {
			isLoaded,
			isEdited,
			languages,
			schema,
		};
	}
);

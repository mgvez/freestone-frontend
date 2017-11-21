//SHARED
import { createSelector } from 'reselect';

const allTranslationsSelector = state => state.freestone.translations && state.freestone.translations.translations;
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
			// console.log(allTranslations);
			const translationValue = allTranslations && allTranslations[lang] && allTranslations[lang][key];

			return {
				translationValue,
			};
		}
	);
}

export function singleTranslationMapStateToProps() {
	const selectorInst = makeSingleTranslationSelector();
	return (state, props) => {
		return selectorInst(state, props);
	};
}

function onlyUnique(value, index, self) {
	return self.indexOf(value) === index;
}

export const coreTranslations = createSelector(
	[allTranslationsSelector, languageKeysSelector, translationsSchemaSelector],
	(translations, languages, schema) => {
		// console.log(translations);
		// console.log(schema);
		const translationKeys = languages.reduce((allKeys, lang) => {
			const langTranslations = translations[lang];
			if (langTranslations) {
				const keys = Object.keys(langTranslations);
				return allKeys.concat(keys);
			}
			return allKeys;
		}, []).filter(onlyUnique).sort((a, b) => { return a > b ? 1 : -1; });

		return {
			translationKeys,
			translations,
			isEdited: translations.isEdited,
			languages,
			schema,
		};
	}
);

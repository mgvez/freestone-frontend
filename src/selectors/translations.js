//SHARED
import { createSelector } from 'reselect';

const allTranslationsSelector = state => state.translations && state.translations.translations;
const placedTranslationsSelector = state => state.translations.placedTranslations && state.translations.placedTranslations;
const allLanguagesSelector = state => state.env.languages;
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
	[allTranslationsSelector, languageKeysSelector, placedTranslationsSelector],
	(translations, languages, placedTranslations) => {

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
			placedTranslations,
			languages,
		};
	}
);

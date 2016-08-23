//SHARED
import { createSelector } from 'reselect';

const allTranslationsSelector = state => state.translations && state.translations.translations;

const keySelector = (state, props) => props.translationKey;
const langSelector = (state, props) => props.language;

function makeSingleTranslationSelector() {
	return createSelector(
		[allTranslationsSelector, keySelector, langSelector],
		(allTranslations, key, lang) => {
			console.log(allTranslations);
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

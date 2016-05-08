import { createSelector } from 'reselect';

const allLanguagesSelector = state => state.env.languages;
const currentLanguageSelector = state => state.userViewSettings.language;

export const userViewLanguageSelector = createSelector(
	[allLanguagesSelector, currentLanguageSelector],
	(allLanguages, currentLanguage) => {
		//default sur premier language si pas setté
		let language = currentLanguage;

		if (!language || !~allLanguages.indexOf(language)) {
			language = allLanguages[0];
		}

		return {
			language,
			allLanguages,
		};
	}
);

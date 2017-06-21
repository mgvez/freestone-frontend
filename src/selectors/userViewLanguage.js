import { createSelector } from 'reselect';

import { languageKeysSelector } from './translations';

const currentLanguageSelector = state => state.freestone.userViewSettings.language;

export const userViewLanguageSelector = createSelector(
	[languageKeysSelector, currentLanguageSelector],
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

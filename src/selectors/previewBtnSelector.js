//SHARED
import { createSelector } from 'reselect';

import { recordSlugsMapStateToProps } from './recordSlugs';
import { userViewLanguageSelector } from './userViewLanguage';

function makeSelector(slugsSelector) {
	return createSelector(
		[slugsSelector, userViewLanguageSelector],
		(recordSlugs, userViewLanguage) => {
			const currentLanguage = (userViewLanguage && userViewLanguage.language);
			const slug = recordSlugs && recordSlugs[currentLanguage];

			return {
				slug,
				currentLanguage,
			};
		}
	);
}

export function previewBtnMapStateToProps() {
	const selectorInst = makeSelector(recordSlugsMapStateToProps());
	return (state, props) => {
		return selectorInst(state, props);
	};
}

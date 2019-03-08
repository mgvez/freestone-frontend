//SHARED
import { createSelector } from 'reselect';

import { recordSlugsMapStateToProps } from './recordSlugs';
import { userViewLanguageSelector } from './userViewLanguage';

const lastEditSelector = state => state.freestone.recordForm.lastEdit.time;


function makeSelector(slugsSelector) {
	return createSelector(
		[slugsSelector, userViewLanguageSelector, lastEditSelector],
		(recordSlugs, userViewLanguage, lastEdit) => {
			const currentLanguage = (userViewLanguage && userViewLanguage.language);
			const slug = recordSlugs && recordSlugs[currentLanguage];

			return {
				slug,
				lastEdit,
				currentLanguage,
			};
		}
	);
}

export function previewRecordMapStateToProps() {
	const selectorInst = makeSelector(recordSlugsMapStateToProps());
	return (state, props) => {
		return selectorInst(state, props);
	};
}

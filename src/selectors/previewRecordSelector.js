//SHARED
import { createSelector } from 'reselect';

import { recordSlugsMapStateToProps } from './recordSlugs';
import { userViewLanguageSelector } from './userViewLanguage';

const lastEditSelector = state => state.freestone.recordForm.lastEdit.time;
const previewSlugsSelector = state => state.freestone.recordPreview.slugs;
const currentPreviewIdSelector = state => state.freestone.recordPreview.currentPreview;


function makeSelector(slugsSelector) {
	return createSelector(
		[slugsSelector, userViewLanguageSelector, lastEditSelector],
		(recordSlugs, userViewLanguage, lastEdit) => {
			// console.log(recordSlugs);
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
		// console.log(props);
		return selectorInst(state, props);
	};
}

export const currentPreviewSelector = createSelector(
	[currentPreviewIdSelector, previewSlugsSelector, userViewLanguageSelector],
	(currentPreview, allSlugs, userViewLanguage) => {
		// console.log(currentPreview);
		// console.log(allSlugs);
		const { tableId, recordId } = currentPreview;
		const recordSlugs = tableId && recordId && allSlugs && allSlugs[tableId] && allSlugs[tableId][recordId];

		const currentLanguage = (userViewLanguage && userViewLanguage.language);
		const currentPreviewSlug = recordSlugs && recordSlugs[currentLanguage];

		return {
			currentPreviewSlug,
		};
	}
);


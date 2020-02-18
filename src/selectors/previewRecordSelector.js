//SHARED
import { createSelector } from 'reselect';

import { recordSlugsMapStateToProps } from './recordSlugs';
import { userViewLanguageSelector } from './userViewLanguage';

const lastEditSelector = state => state.freestone.recordForm.lastEdit.time;
const previewSlugsSelector = state => state.freestone.recordPreview.slugs;
const previewIdsSelector = state => state.freestone.recordPreview.previewIds;
const currentPreviewIdSelector = state => state.freestone.recordPreview.currentPreview;
const previewStateSelector = state => state.freestone.recordPreview.previewState;
const previewProcessorTableIdSelector = (state, props) => props.tableId;
const previewProcessorRecordIdSelector = (state, props) => props.recordId;


function makeSelector(slugsSelector) {
	return createSelector(
		[slugsSelector, userViewLanguageSelector, lastEditSelector, previewIdsSelector, previewProcessorTableIdSelector, previewProcessorRecordIdSelector, currentPreviewIdSelector],
		(recordSlugs, userViewLanguage, lastEdit, previewIds, tableId, recordId, currentPreview) => {
			// console.log(recordSlugs);

			const previewRecordId = previewIds[tableId] && previewIds[tableId][recordId];

			const currentLanguage = (userViewLanguage && userViewLanguage.language);
			const slug = recordSlugs && recordSlugs[currentLanguage];

			return {
				slug,
				lastEdit,
				currentLanguage,
				previewRecordId,
				currentPreviewType: currentPreview.type,
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
	[currentPreviewIdSelector, previewSlugsSelector, userViewLanguageSelector, previewStateSelector],
	(currentPreview, allSlugs, userViewLanguage, isPreviewing) => {
		// console.log(currentPreview);
		// console.log(allSlugs);
		// console.log(isPreviewing);
		const { tableId, recordId, type } = currentPreview;
		const recordSlugs = tableId && recordId && allSlugs && allSlugs[tableId] && allSlugs[tableId][recordId];

		const currentLanguage = (userViewLanguage && userViewLanguage.language);
		const currentPreviewSlug = recordSlugs && recordSlugs[currentLanguage];

		return {
			currentPreviewSlug,
			isPreviewing,
			type,
		};
	}
);


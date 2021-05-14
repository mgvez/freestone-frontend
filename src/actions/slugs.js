import { FREESTONE_API } from '../middleware/api';
import { createRequestTypes } from './apiAction';

export const SLUG_API = createRequestTypes('SLUG_API');
export const WORKING_SLUG_API = createRequestTypes('WORKING_SLUG_API');

export function fetchSlug(tableNameId, recordId) {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: SLUG_API,
				route: `slug/${tableNameId}/${recordId}`,
				data: {
				},
			},
		});
	};
}

export function fetchWorkingSlug(tableNameId, recordId, record) {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: WORKING_SLUG_API,
				route: `slug/${tableNameId}/${recordId}`,
				data: {
					record,
				},
			},
		});
	};
}

export function navigateToSlug(tableNameId, recordId, currentLanguage) {
	return (dispatch) => {
		// console.log(tableNameId, recordId);

		const onSlugReceived = dispatch({
			[FREESTONE_API]: {
				types: ['api::fetch-slug', null, null],
				route: `slug/${tableNameId}/${recordId}`,
				data: {
				},
			},
		});

		onSlugReceived.then((res) => {
			// console.log(res, currentLanguage);
			if (!res || !res.slugs) return;
			const lang = currentLanguage || Object.keys(res.slugs).shift();
			const slug = res.slugs[lang];
			// console.log(slug);
			window.open(slug);
			// console.log(newWindow);
		});
	};
}

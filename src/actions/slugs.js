import { FREESTONE_API } from '../middleware/api';
import { createRequestTypes } from './apiAction';

export const SLUG_API = createRequestTypes('SLUG_API');


export function fetchSlug(tableNameId, recordId) {
	return (dispatch) => {
		// console.log(tableName, recordId);
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
			if (!res || !res.slugs) return;
			const lang = currentLanguage || Object.keys(res.slugs).shift();
			const slug = res.slugs[lang];
			window.open(slug);
		});
	};
}

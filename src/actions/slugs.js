import { FREESTONE_API } from '../middleware/api';
import { createRequestTypes } from './apiAction';

import reqwest from 'reqwest';

export const SLUG_API = createRequestTypes('SLUG_API');


export function receiveSlugs() {

}

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

const previewWindows = {};
export function showPreview(tableNameId, recordId, currentLanguage, slugs) {
	if (!slugs) return;
	const hash = `win_${tableNameId}_${recordId}`;
	const slug = slugs[currentLanguage] || (Object.values(slugs))[0];
	// console.log(previewWindows[hash]);
	if (previewWindows[hash] && previewWindows[hash].closed) {
		previewWindows[hash] = null;
	} 
	
	if (!previewWindows[hash]) {
		previewWindows[hash] = window.open(slug);
	} else {
		previewWindows[hash].location = slug;
	}
	// if (!previewWindows[hash]) {
	// 	previewWindows[hash] = window.open();
	// }


	// const curScroll = previewWindows[hash].pageYOffset;

	// reqwest({
	// 	url: slug,
	// 	crossOrigin: true,
	// 	type: 'html',
	// 	method: 'get',
	// }).then((r) => {
	// 	// console.log(r);
	// 	// previewWindows[hash];
	// 	const doc = previewWindows[hash].document;


	// 	previewWindows[hash].document.onload = () => {
	// 		console.log(curScroll);
	// 		previewWindows[hash].scrollTo(0, curScroll);
	// 	};

	// 	doc.open();
	// 	doc.write(r);
	// 	doc.close();
	// 	// setTimeout(() => {
	// 	// 	previewWindows[hash].scrollTo(0, curScroll);
	// 	// }, 100);
	// });

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
			const newWindow = window.open(slug);
			// console.log(newWindow);
		});
	};
}

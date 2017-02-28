import { createSelector } from 'reselect';

import { recordSlugsMapStateToProps } from 'selectors/recordSlugs';
import { GOD_USER_GROUP } from 'freestone/settings';

const isGodSelector = state => state.auth.usergroup === GOD_USER_GROUP;


export const formHeaderSelector = createSelector(
	[recordSlugsMapStateToProps(), isGodSelector],
	(recordSlugs, isGod) => {
		// console.log(recordSlugs);

		const slugs = recordSlugs && Object.keys(recordSlugs).map(lang => {
			return {
				lang,
				slug: recordSlugs[lang],
			};
		});

		return {
			slugs,
			isGod,
		};
	}
);


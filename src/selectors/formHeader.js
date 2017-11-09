import { createSelector } from 'reselect';

import { recordSlugsMapStateToProps } from './recordSlugs';
import { isGodSelector } from './credentials';


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
			...isGod,
		};
	}
);


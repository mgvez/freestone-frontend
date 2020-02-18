import { createSelector } from 'reselect';

import { recordSlugsMapStateToProps } from './recordSlugs';
import { isGodSelector } from './credentials';
const isProdEnvSelector = state => state.freestone.env.freestone.isProdEnv;


export const formHeaderSelector = createSelector(
	[recordSlugsMapStateToProps(), isGodSelector, isProdEnvSelector],
	(recordSlugs, isGod, isProdEnv) => {
		// console.log(isProdEnv);
		const slugs = recordSlugs && Object.keys(recordSlugs).map(lang => {
			return {
				lang,
				slug: recordSlugs[lang],
			};
		});

		return {
			slugs,
			...isGod,
			isProdEnv,
		};
	}
);


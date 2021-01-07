import { createSelector } from 'reselect';

import { recordSlugsMapStateToProps } from './recordSlugs';
const isProdEnvSelector = state => state.freestone.env.freestone.isProdEnv;


export const recordInfoSelector = createSelector(
	[recordSlugsMapStateToProps(), isProdEnvSelector],
	(recordSlugs, isProdEnv) => {
		const slugs = recordSlugs && Object.keys(recordSlugs).map(lang => {
			return {
				lang,
				slug: recordSlugs[lang],
			};
		});

		return {
			slugs,
			isProdEnv,
		};
	}
);


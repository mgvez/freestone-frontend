import { createSelector } from 'reselect';

const isProdEnvSelector = state => state.freestone.env.freestone.isProdEnv;
import { isGodSelector } from './credentials';
const navVisibilitySelector = state => state.freestone.siteHeader.nav_visibility;

export const headerSelector = createSelector(
	[isGodSelector, isProdEnvSelector, navVisibilitySelector],
	(isGod, isProdEnv, isNavVisible) => {
		return {
			...isGod,
			isNavVisible,
			isProdEnv,
		};
	}
);

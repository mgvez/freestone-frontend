import { createSelector } from 'reselect';

const isProdEnvSelector = state => state.freestone.env.freestone.isProdEnv;
const versionInfoSelector = state => state.freestone.env.freestone.versionInfo;
import { isGodSelector } from './credentials';
const navVisibilitySelector = state => state.freestone.siteHeader.nav_visibility;

export const headerSelector = createSelector(
	[isGodSelector, isProdEnvSelector, navVisibilitySelector, versionInfoSelector],
	(isGod, isProdEnv, isNavVisible, versionInfo) => {
		return {
			...isGod,
			isNavVisible,
			isProdEnv,
			versionInfo,
		};
	}
);

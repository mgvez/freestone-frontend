import { createSelector } from 'reselect';

const isLiveEnvSelector = state => state.freestone.env.freestone.isLiveEnv;
import { isGodSelector } from './credentials';


export const headerSelector = createSelector(
	[isGodSelector, isLiveEnvSelector],
	(isGod, isLiveEnv) => {
		return {
			...isGod,
			isLiveEnv,
		};
	}
);

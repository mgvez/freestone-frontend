import { createSelector } from 'reselect';

const isProdEnvSelector = state => state.freestone.env.freestone.isProdEnv;
import { isGodSelector } from './credentials';


export const headerSelector = createSelector(
	[isGodSelector, isProdEnvSelector],
	(isGod, isProdEnv) => {
		return {
			...isGod,
			isProdEnv,
		};
	}
);

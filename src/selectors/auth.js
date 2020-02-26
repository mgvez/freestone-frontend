
import { createSelector } from 'reselect';
import { searchParamsSelector } from './route';

const authRawSelector = state => state.freestone.auth;
const isInstalledSelector = state => state.freestone.env.clientVariables && state.freestone.env.clientVariables.isInstalled;
const apiGoogleSelector = state => state.freestone.env.clientVariables && state.freestone.env.clientVariables.api_google;

export const authSelector = createSelector(
	[authRawSelector, isInstalledSelector, apiGoogleSelector, searchParamsSelector],
	(auth, isInstalled, apiGoogle, searchParams) => {
		// console.log(searchParams);
		return {
			...auth,
			isInstalled,
			apiGoogle,
			resetPasswordKey: searchParams && searchParams.rpk,
		};
	}
);


import { createSelector } from 'reselect';
import { searchParamsSelector } from './route';

const authRawSelector = state => state.freestone.auth;
const isInstalledSelector = state => state.freestone.env.clientVariables && state.freestone.env.clientVariables.isInstalled;
const apiGoogleSelector = state => state.freestone.env.clientVariables && state.freestone.env.clientVariables.api_google;
const siteNameSelector = state => state.freestone.env.freestone && state.freestone.env.freestone.siteName;
const clientPathSelector = state => state.freestone.env.freestone && state.freestone.env.freestone.clientPath;
const ssoAdminURLSelector = state => state.freestone.env.freestone && state.freestone.env.freestone.ssoAdminURL;

export const authSelector = createSelector(
	[authRawSelector, isInstalledSelector, apiGoogleSelector, searchParamsSelector, siteNameSelector, clientPathSelector, ssoAdminURLSelector],
	(auth, isInstalled, apiGoogle, searchParams, siteName, clientPath, ssoAdminURL) => {
		return {
			...auth,
			resetPasswordKey: searchParams && searchParams.rpk,
			isInstalled,
			apiGoogle,
			siteName,
			clientPath,
			ssoAdminURL,
		};
	}
);


import { createSelector } from 'reselect';
const clientComponentsSelector = state => state.freestone.env.freestone.clientComponents;
const requestedComponentsNameSelector = (state, props) => props.name;

export const clientComponentInfosSelector = createSelector(
	[clientComponentsSelector, requestedComponentsNameSelector],
	(clientComponents, requestedComponentsName) => {
		return (clientComponents && clientComponents.find(el => el.id === requestedComponentsName)) || {};
	}
);

const stateJWTSelector = state => state.freestone.auth.jwt;
const urlJWTSelector = createSelector(
	[],
	() => {
		const currentURL = new URL(window.location.href);
		const jwtInGET = currentURL.searchParams.get('jwt');
		if (jwtInGET && jwtInGET.length > 0) {
			return jwtInGET;
		}

		return null;
	}
);

const redirectOnLoginURLSelector = createSelector(
	[],
	() => {
		const currentURL = new URL(window.location.href);
		const redirectURL = currentURL.searchParams.get('redirect_url');
		if (redirectURL && redirectURL.length > 0) {
			return redirectURL;
		}

		return null;
	}
);


const isAuthenticatedSelector = state => state.freestone.auth.isAuthenticated;
const needsReloginSelector = state => state.freestone.auth.needsRelogin;
const domainSelector = state => state.freestone.env.freestone.domain;
const clientScriptsSelector = state => state.freestone.env.freestone.clientScripts;
const isNavVisibleSelector = state => state.freestone.siteHeader.nav_visibility;
const versionSelector = state => state.freestone.env.freestone.version;

export const appRootSelector = createSelector(
	[isAuthenticatedSelector, needsReloginSelector, redirectOnLoginURLSelector, stateJWTSelector, urlJWTSelector, domainSelector, clientScriptsSelector, isNavVisibleSelector, versionSelector],
	(isAuthenticated, needsRelogin, redirectOnLoginURL, jwt, urlJWT, domain, clientScripts, isNavVisible, version) => {
		return {
			needsRelogin,
			redirectOnLoginURL,
			jwt,
			urlJWT,
			isAuthenticated,
			domain,
			clientScripts,
			isNavVisible,
			...version,
		};
	}
);

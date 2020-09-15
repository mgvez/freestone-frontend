
import { createSelector } from 'reselect';
const clientComponentsSelector = state => state.freestone.env.freestone.clientComponents;
const requestedComponentsNameSelector = (state, props) => props.name;

export const clientComponentInfosSelector = createSelector(
	[clientComponentsSelector, requestedComponentsNameSelector],
	(clientComponents, requestedComponentsName) => {
		return (clientComponents && clientComponents.find(el => el.id === requestedComponentsName)) || {};
	}
);

const isAuthenticatedSelector = state => state.freestone.auth.isAuthenticated;
const needsReloginSelector = state => state.freestone.auth.needsRelogin;
const jwtSelector = state => state.freestone.auth.jwt;
const domainSelector = state => state.freestone.env.freestone.domain;
const clientScriptsSelector = state => state.freestone.env.freestone.clientScripts;
const isNavVisibleSelector = state => state.freestone.siteHeader.nav_visibility;
const versionSelector = state => state.freestone.env.freestone.version;

export const appRootSelector = createSelector(
	[isAuthenticatedSelector, needsReloginSelector, jwtSelector, domainSelector, clientScriptsSelector, isNavVisibleSelector, versionSelector],
	(isAuthenticated, needsRelogin, jwt, domain, clientScripts, isNavVisible, version) => {
		return {
			needsRelogin,
			jwt,
			isAuthenticated,
			domain,
			clientScripts,
			isNavVisible,
			...version,
		};
	}
);

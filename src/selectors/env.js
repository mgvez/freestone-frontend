
import { createSelector } from 'reselect';
import { TINYMCE_CONFIG } from '../tinymce/default';
import { routeSelector } from './route';

const settingsSelector = state => state.freestone.env.clientVariables.settings;
const cssPathSelector = state => state.freestone.env.freestone.pathCss;
const clientPathSelector = state => state.freestone.env.freestone.clientPath;
const clientComponentsSelector = state => state.freestone.env.freestone.clientComponents;
const requestedComponentsNameSelector = (state, props) => props.name;

export const mceConfigSelector = createSelector(
	[settingsSelector, cssPathSelector, clientPathSelector, routeSelector],
	(settings, cssPath, clientPath, route) => {
		if (!settings) return {};

		const config = (settings && settings.tinymceConfig) || {};
		const tinymceConfig = {
			...TINYMCE_CONFIG,
			...config,
		};
		// console.log(tinymceConfig);
		if (cssPath && cssPath.length) {
			tinymceConfig.content_css = cssPath.map(p => `${clientPath}${p}`);
		}
		
		return {
			tinymceConfig,
			route: route.path,
		};
	}
);


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

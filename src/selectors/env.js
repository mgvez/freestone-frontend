
import { createSelector } from 'reselect';
const clientComponentsSelector = state => state.freestone.env.freestone.clientComponents;
const requestedComponentsNameSelector = (state, props) => props.name;

export const clientComponentInfosSelector = createSelector(
	[clientComponentsSelector, requestedComponentsNameSelector],
	(clientComponents, requestedComponentsName) => {
		return (clientComponents && clientComponents.find(el => el.id === requestedComponentsName)) || {};
	}
);

const stateTicketSelector = state => state.freestone.auth.ticket;
const urlTicketSelector = createSelector(
	[],
	() => {
		const currentURL = new URL(window.location.href);
		const ticketInGET = currentURL.searchParams.get('ticket');
		if (ticketInGET && ticketInGET.length > 0) {
			return ticketInGET;
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
const jwtSelector = state => state.freestone.auth.jwt;
const domainSelector = state => state.freestone.env.freestone.domain;
const clientScriptsSelector = state => state.freestone.env.freestone.clientScripts;
const isNavVisibleSelector = state => state.freestone.siteHeader.nav_visibility;
const versionSelector = state => state.freestone.env.freestone.version;

export const appRootSelector = createSelector(
	[isAuthenticatedSelector, needsReloginSelector, jwtSelector, redirectOnLoginURLSelector, stateTicketSelector, urlTicketSelector, domainSelector, clientScriptsSelector, isNavVisibleSelector, versionSelector],
	(isAuthenticated, needsRelogin, jwt, redirectOnLoginURL, ticket, urlTicket, domain, clientScripts, isNavVisible, version) => {
		return {
			needsRelogin,
			redirectOnLoginURL,
			jwt,
			ticket,
			urlTicket,
			isAuthenticated,
			domain,
			clientScripts,
			isNavVisible,
			...version,
		};
	}
);

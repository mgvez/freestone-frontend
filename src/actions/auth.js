import jwtDecode from 'jwt-decode';
import { FREESTONE_API } from '../middleware/api';
import { createRequestTypes } from './apiAction';

export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const UNAUTHORIZED = 'UNAUTHORIZED';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const CLEAR_AUTH_MESSAGES = 'CLEAR_AUTH_MESSAGES';
export const SET_TICKET = 'SET_TICKET';

export const RESET_REQUEST_API = createRequestTypes('RESET_REQUEST_API');
export const LOGOUT_API = createRequestTypes('LOGOUT_API');
export const LOGIN_API = createRequestTypes('LOGIN_API');
export const INSTALL_API = createRequestTypes('INSTALL_API');
export const PING_API = createRequestTypes('PING_API');
export const RESET_API = createRequestTypes('RESET_API', true);


//login api actions don't return their values directly through a api succes, but are rather caught by the middleware. Login can be included in any API response, not only login requests.

//middleware will call receiveToken hwne a jwt is part of a response from the API. These can be included in the response of any API call, and are not limited to login requests, so the login requests don't need to set a success or failure action.
function loginUserSuccess(jwt, token) {
	return {
		type: LOGIN_USER_SUCCESS,
		payload: {
			jwt,
			token,
		},
	};
}

export function clearStatus() {
	return {
		type: CLEAR_AUTH_MESSAGES,
	};
}

export function loginUserFailure(error) {
	const { responseText } = error;
	// console.log(error);
	return {
		type: LOGIN_USER_FAILURE,
		payload: {
			error,
			message: responseText,
		},
	};
}

export function receiveToken(jwt) {
	try {
		const token = jwtDecode(jwt);
		return loginUserSuccess(jwt, token);
	} catch (e) {
		// console.log(jwt);
		return loginUserFailure({
			status: 401,
			statusText: 'Invalid token',
		});
	}
}

export function receiveTicket(ticket) {
	return {
		type: SET_TICKET,
		payload: { ticket },
	};
}

export function setTicket(ticket) {
	const url = new URL(window.location);
	url.searchParams.delete('ticket');
	window.history.pushState({}, '', url.toString());
	return (dispatch) => {
		dispatch({
			type: SET_TICKET,
			payload: { ticket },
		});
	};
}

export function logout() {

	//attempt logout google
	const auth2 = window.gapi && window.gapi.auth2 && window.gapi.auth2.getAuthInstance();
	if (auth2) auth2.signOut();

	return (dispatch) => {
		// console.log(redirect);
		// console.log(action);
		return dispatch({
			[FREESTONE_API]: {
				types: LOGOUT_API, //[LOGOUT_REQUEST, LOGOUT_API.SUCCESS, LOGOUT_FAILURE],
				route: 'login',
				data: {
					logout: true,
				},
			},
		});
	};
}

export function unauthorized(error = {}) {
	return {
		type: UNAUTHORIZED,
		payload: {
			error,
		},
	};
}

export function loginUser(username = null, password = null, remember = null, processInstall = false) {
	return (dispatch) => {
		// console.log(redirect);
		const data = (username || password) ? {
			freestoneuser: username,
			freestonepass: password,
			freestoneremember: remember ? '1' : '0',
			freestoneinstall: processInstall ? '1' : '0',
		} : {};

		const queryString = (new URL(window.location.href)).searchParams;
		const ticket = queryString.get('ticket');
		if (ticket) {
			data.ticket = ticket;
		}
		const siteName = queryString.get('site_name');
		if (siteName) {
			data.site_name = siteName;
		}

		const actionType = processInstall ? INSTALL_API : LOGIN_API;
		return dispatch({
			[FREESTONE_API]: {
				types: actionType,
				route: 'login',
				data,
			},
		});
	};
}

export function requestReset(email) {
	return (dispatch) => {

		return dispatch({
			[FREESTONE_API]: {
				types: RESET_REQUEST_API,
				route: 'login',
				data: {
					resetPassword: email,
				},
			},
		});
	};
}

export function resetPassword(rpk, password = null) {
	return (dispatch) => {

		return dispatch({
			[FREESTONE_API]: {
				types: RESET_API,
				route: 'login',
				data: {
					rpk,
					freestonepass: password,
				},
			},
		});
	};
}

export function loginGoogleAPI(token_id, token_access) {
	if (!token_id || !token_access) return null;
	return (dispatch) => {
		// console.log(token_id);
		// console.log(token_access);
		return dispatch({
			[FREESTONE_API]: {
				types: LOGIN_API,
				route: 'login',
				data: {
					googletoken_id: token_id,
					googletoken_access: token_access,
				},
			},
		});
	};
}

export function pingAuth() {
	return (dispatch) => {
		// console.log(token_id);
		// console.log(token_access);
		return dispatch({
			[FREESTONE_API]: {
				types: PING_API,
				route: 'login',
			},
		});
	};
}

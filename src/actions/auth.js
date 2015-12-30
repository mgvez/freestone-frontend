
import { pushPath } from 'redux-simple-router';
import jwtDecode from 'jwt-decode';
import { ajax } from './ajax';

export const TOKEN_NAME = 'jwt';

export function setJWT(jwt) {
	localStorage.setItem(TOKEN_NAME, jwt);
}

export function getJWT() {
	return localStorage.getItem(TOKEN_NAME);
}

function loginUserSuccess(jwt, token) {
	setJWT(jwt);
	return {
		type: 'LOGIN_USER_SUCCESS',
		payload: {
			jwt,
			token,
		},
	};
}

export function loginUserFailure(error) {
	localStorage.removeItem(TOKEN_NAME);
	return {
		type: 'LOGIN_USER_FAILURE',
		payload: {
			status: error.response.status,
			statusText: error.response.statusText,
		},
	};
}

export function receiveToken(jwt, dispatch) {
	if (jwt) {
		try {
			const token = jwtDecode(jwt);
			console.log(token);
			dispatch(loginUserSuccess(jwt, token));
		} catch (e) {
			dispatch(loginUserFailure({
				response: {
					status: 403,
					statusText: 'Invalid token',
				},
			}));
		}
	}
}

function loginUserRequest() {
	return {
		type: 'LOGIN_USER_REQUEST',
	};
}

function logout() {
	localStorage.removeItem(TOKEN_NAME);
	return {
		type: 'LOGOUT_USER',
	};
}

export function logoutAndRedirect() {
	return (dispatch) => {
		dispatch(logout());
		dispatch(pushPath('/login'));
	};
}

export function loginUser(username, password, redirect = '/home') {
	return (dispatch) => {
		dispatch(loginUserRequest());

		return ajax('', { freestoneuser: username, freestonepass: password })(dispatch)
		.then(() => {
			// console.log(redirect);
			dispatch(pushPath(redirect));
		})
		.catch(error => {
			// console.log(error);
			// console.log(error.responseText);
			dispatch(loginUserFailure(error));
		});
	};
}

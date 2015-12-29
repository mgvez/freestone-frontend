

import { pushState } from 'redux-simple-router';
import jwtDecode from 'jwt-decode';
import reqwest from 'reqwest';

export const TOKEN_NAME = 'jwt';

export function loginUserSuccess(token) {
	localStorage.setItem(TOKEN_NAME, token);
	return {
		type: 'LOGIN_USER_SUCCESS',
		payload: {
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

export function loginUserRequest() {
	return {
		type: 'LOGIN_USER_REQUEST',
	};
}

export function logout() {
	localStorage.removeItem(TOKEN_NAME);
	return {
		type: 'LOGOUT_USER',
	};
}

export function logoutAndRedirect() {
	return (dispatch) => {
		dispatch(logout());
		dispatch(pushState(null, '/login'));
	};
}

export function loginUser(username, password, redirect = '/home') {
	return (dispatch) => {
		dispatch(loginUserRequest());
		return reqwest({
			url: 'http://freestone_dev.freestone-2/admin/auth',
			method: 'post',
			credentials: 'include',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ freestoneuser: username, freestonepass: password }),
		})
		.then(response => {
			try {
				jwtDecode(response.token);
				dispatch(loginUserSuccess(response.token));
				dispatch(pushState(null, redirect));
			} catch (e) {
				dispatch(loginUserFailure({
					response: {
						status: 403,
						statusText: 'Invalid token',
					},
				}));
			}
		})
		.catch(error => {
			dispatch(loginUserFailure(error));
		});
	};
}

export function receiveProtectedData(data) {
	return {
		type: 'RECEIVE_PROTECTED_DATA',
		payload: {
			data,
		},
	};
}

export function fetchProtectedDataRequest() {
	return {
		type: 'FETCH_PROTECTED_DATA_REQUEST',
	};
}

export function fetchProtectedData(token) {
	return (dispatch) => {
		dispatch(fetchProtectedDataRequest());
		return reqwest({
			url: 'http://localhost:3000/getData/',
			credentials: 'include',
			headers: {
				'Authorization': `Bearer ${token}`,
			},
		})
		.then(response => {
			dispatch(receiveProtectedData(response.data));
		})
		.catch(error => {
			if (error.response.status === 401) {
				dispatch(loginUserFailure(error));
				dispatch(pushState(null, '/login'));
			}
		});
	};
}

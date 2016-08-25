import jwtDecode from 'jwt-decode';
import { FREESTONE_API } from 'middleware/api';

export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const UNAUTHORIZED = 'UNAUTHORIZED';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';


function loginUserSuccess(jwt, token) {
	return {
		type: LOGIN_USER_SUCCESS,
		payload: {
			jwt,
			token,
		},
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
		// console.log(`received token ${token}`);
		return loginUserSuccess(jwt, token);
	} catch (e) {
		// console.log(jwt);
		return loginUserFailure({
			status: 401,
			statusText: 'Invalid token',
		});
	}
}

// function loginUserRequest() {
// 	return {
// 		type: 'LOGIN_USER_REQUEST',
// 	};
// }

export function logout() {

	//attempt logout google
	const auth2 = window.gapi && window.gapi.auth2 && window.gapi.auth2.getAuthInstance();
	if (auth2) auth2.signOut();

	return (dispatch) => {
		// console.log(redirect);
		// console.log(action);
		return dispatch({
			[FREESTONE_API]: {
				types: [LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE],
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


export function loginUser(username, password, remember, processInstall) {
	return (dispatch) => {
		// console.log(redirect);
		// console.log(action);
		return dispatch({
			[FREESTONE_API]: {
				types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
				route: 'login',
				data: {
					freestoneuser: username,
					freestonepass: password,
					freestoneremember: remember ? '1' : '0',
					freestoneinstall: processInstall ? '1' : '0',
				},
			},
		});
	};
}

export function loginGoogleAPI(token) {
	return (dispatch) => {
		// console.log(redirect);
		// console.log(action);
		return dispatch({
			[FREESTONE_API]: {
				types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
				route: 'login',
				data: {
					googletoken: token,
				},
			},
		});
	};
}

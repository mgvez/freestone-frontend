import jwtDecode from 'jwt-decode';
import { FREESTONE_API } from 'middleware/api';

export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const LOGOUT_USER = 'LOGOUT_USER';
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
	const { response } = error;
	// console.log(response);
	return {
		type: LOGIN_USER_FAILURE,
		payload: {
			error,
			response,
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
	return {
		type: LOGOUT_USER,
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


export function loginUser(username, password) {
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
				},
			},
		});
	};

}

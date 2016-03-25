
import { push as pushPath } from 'react-router-redux';
import jwtDecode from 'jwt-decode';
import { FREESTONE_API } from 'middleware/api';


function loginUserSuccess(jwt, token) {
	return {
		type: 'LOGIN_USER_SUCCESS',
		payload: {
			jwt,
			token,
		},
	};
}

export function loginUserFailure(error) {
	return {
		type: 'LOGIN_USER_FAILURE',
		payload: error,
	};
}

export function receiveToken(jwt) {
	if (jwt) {
		try {
			const token = jwtDecode(jwt);
			// console.log(`received token ${token}`);
			return loginUserSuccess(jwt, token);
		} catch (e) {
			return loginUserFailure({
				status: 401,
				statusText: 'Invalid token',
			});
		}
	}
}

// function loginUserRequest() {
// 	return {
// 		type: 'LOGIN_USER_REQUEST',
// 	};
// }

export function logout() {
	return {
		type: 'LOGOUT_USER',
	};
}

export function unauthorized() {
	return {
		type: 'UNAUTHORIZED',
	};
}


export function loginUser(username, password, redirect = '/home') {
	return (dispatch) => {
		// console.log(redirect);
		// console.log(action);
		return dispatch({
			[FREESTONE_API]: {
				types: ['LOGIN_REQUEST', 'LOGIN_SUCCESS', 'LOGIN_FAILURE'],
				route: 'login',
				data: {
					freestoneuser: username,
					freestonepass: password,
				},
			},
		}).then(() => {
			// console.log(res);
			// console.log('redirect to' + redirect);
			dispatch(pushPath(redirect));
		});
	};

}

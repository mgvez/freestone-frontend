
import { UNAUTHORIZED, LOGIN_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER } from 'actions/auth';

const initialState = {
	jwt: null,
	userName: null,
	isAuthenticated: false,
	isAuthenticating: false,
	statusText: null,
};

export function auth(state = initialState, action) {
	switch (action.type) {
	case UNAUTHORIZED:
		return {
			...state,
			isAuthenticated: false,
			jwt: null,
			userName: null,
			email: null,
			emailHash: null,
			statusText: 'Unauthorized',
		};
	case LOGIN_REQUEST:
		return {
			...state,
			isAuthenticating: true,
			statusText: 'Checking credentials...',
		};
	case LOGIN_USER_SUCCESS:
		// console.log(action.payload);
		return {
			...state,
			isAuthenticating: false,
			isAuthenticated: true,
			jwt: action.payload.jwt,
			userName: action.payload.token.data.realname,
			email: action.payload.token.data.email,
			emailHash: action.payload.token.data.email_hash,
			statusText: 'You have been successfully logged in.',
		};
	case LOGIN_USER_FAILURE:
		return {
			...state,
			isAuthenticating: false,
			isAuthenticated: false,
			jwt: null,
			userName: null,
			email: null,
			emailHash: null,
			statusText: `Authentication Error: ${action.payload.status} ${action.payload.statusText}`,
		};
	case LOGOUT_USER:
		return {
			...state,
			isAuthenticated: false,
			jwt: null,
			userName: null,
			email: null,
			emailHash: null,
			statusText: 'You have been successfully logged out.',
		};
	default:
		return state;
	}
}

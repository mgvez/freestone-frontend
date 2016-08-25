
import { UNAUTHORIZED, LOGIN_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_SUCCESS } from 'actions/auth';
import { FREESTONE_API_REQUEST, FREESTONE_API_FAILURE, FREESTONE_API_FATAL_FAILURE } from 'middleware/api';

const initialState = {
	jwt: null,
	userName: null,
	isAuthenticated: false,
	isAuthenticating: false,
	statusText: null,
	realName: null,
	lastRequestTime: 0,
};

export function auth(state = initialState, action) {

	switch (action.type) {
	case FREESTONE_API_REQUEST:
		return {
			...state,
			lastRequestTime: Date.now(),
		};
	case FREESTONE_API_FAILURE:
	case FREESTONE_API_FATAL_FAILURE:
		//si failure, reset pour éviter que le btn login soit désactivé
		return {
			...state,
			statusText: '',
			isAuthenticating: false,
		};
	case UNAUTHORIZED:
		// const err = action.payload.response;
		// console.log(err);

		return {
			...state,
			isAuthenticated: false,
			jwt: null,
			userName: null,
			userId: null,
			email: null,
			statusText: `${action.payload.error.status} ${action.payload.error.statusText}`,
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
			userId: action.payload.token.data.id,
			realName: action.payload.token.data.realname,
			picture: action.payload.token.data.picture,
			statusText: 'You have been successfully logged in.',
		};
	case LOGIN_USER_FAILURE: {
		const err = action.payload.message;
		return {
			...state,
			isAuthenticating: false,
			isAuthenticated: false,
			jwt: null,
			userName: null,
			userId: null,
			email: null,
			statusText: `Authentication Error: ${err}`,
		};
	}
	case LOGOUT_SUCCESS:
		return {
			...state,
			isAuthenticated: false,
			jwt: null,
			userName: null,
			userId: null,
			email: null,
			statusText: 'You have been successfully logged out.',
		};
	default:
		return state;
	}
}

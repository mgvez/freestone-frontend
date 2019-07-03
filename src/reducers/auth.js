
import { UNAUTHORIZED, LOGIN_API, INSTALL_API, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_API } from '../actions/auth';
import { FREESTONE_API_REQUEST, FREESTONE_API_FAILURE, FREESTONE_API_FATAL_FAILURE } from '../middleware/api';
import { MAX_TIME_BETWEEN_API_CALLS } from '../freestone/settings';

const initialState = {
	jwt: null,
	userName: null,
	isAuthenticated: false,
	isAuthenticating: false,
	statusText: null,
	realName: null,
	needsRelogin: 0,
	email: '',
	userId: null,
	picture: '',
	usergroup: 0,
	gapi_token_id: null,
	gapi_token_access: null,
};

let lastRequestTime = Date.now();
export default function(state = initialState, action) {

	switch (action.type) {
	case FREESTONE_API_REQUEST: {

		const now = Date.now();
		const diff = (now - lastRequestTime) / 1000;
		lastRequestTime = Date.now();
		if (diff > MAX_TIME_BETWEEN_API_CALLS) {
			return {
				...state,
				needsRelogin: true,
			};
		}
		return state;
	}
	case FREESTONE_API_FAILURE:
	case FREESTONE_API_FATAL_FAILURE:
		//si failure, reset pour éviter que le btn login soit désactivé
		return {
			...state,
			statusText: '',
			isAuthenticating: false,
			needsRelogin: false,
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
			needsRelogin: false,
			statusText: `${action.payload.error.status} ${action.payload.error.statusText}`,
		};
	case INSTALL_API.REQUEST:
		return {
			...state,
			isAuthenticating: true,
			statusText: 'Installing, please wait...',
		};
	case LOGIN_API.REQUEST:
		// console.log(action.data);
		return {
			...state,
			isAuthenticating: true,
			statusText: 'Checking credentials...',
			gapi_token_id: action.data.googletoken_id,
			gapi_token_access: action.data.googletoken_access,
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
			userId: Number(action.payload.token.data.id),
			realName: action.payload.token.data.realname,
			picture: action.payload.token.data.picture,
			usergroup: Number(action.payload.token.data.usergroup),
			needsRelogin: false,
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
			needsRelogin: false,
			statusText: `Authentication Error: ${err}`,
		};
	}
	case LOGOUT_API.SUCCESS:
		return {
			...state,
			isAuthenticated: false,
			jwt: null,
			userName: null,
			userId: null,
			email: null,
			needsRelogin: false,
			statusText: 'You have been successfully logged out.',
		};
	default:
		return state;
	}
}

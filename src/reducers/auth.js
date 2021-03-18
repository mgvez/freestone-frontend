
import { UNAUTHORIZED, LOGIN_API, RESET_REQUEST_API, INSTALL_API, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_API, CLEAR_AUTH_MESSAGES, RESET_API, SET_TOKEN } from '../actions/auth';
import { FREESTONE_API_FAILURE, FREESTONE_API_FATAL_FAILURE } from '../middleware/api';
import { MAX_TIME_BETWEEN_API_CALLS } from '../freestone/settings';

const initialState = {
	jwt: null,
	userName: null,
	isAuthenticated: false,
	isRequestPending: false,
	statusText: null,
	realName: null,
	needsRelogin: false,
	email: '',
	userId: null,
	picture: '',
	isResetKeyValid: true,
	isResetRequestSent: false,
	usergroup: 0,
	gapi_token_id: null,
	gapi_token_access: null,
};

let lastRequestTime = Date.now();
export default function(state = initialState, action) {

	switch (action.type) {
	case FREESTONE_API_FAILURE:
	case FREESTONE_API_FATAL_FAILURE:
		//si failure, reset pour éviter que le btn login soit désactivé
		return {
			...state,
			statusText: '',
			isRequestPending: false,
			needsRelogin: false,
		};
	case LOGOUT_API.REQUEST:
		return {
			...initialState,
		};
	case CLEAR_AUTH_MESSAGES:
		return {
			...state,
			statusText: null,
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
	case SET_TOKEN:
		return {
			...state,
			jwt: action.payload.jwt,
			needsRelogin: true,
		};
	case INSTALL_API.REQUEST:
		return {
			...state,
			isRequestPending: true,
			statusText: 'Installing, please wait...',
		};
	case LOGIN_API.REQUEST:
		// console.log(action.data);
		return {
			...state,
			isRequestPending: true,
			statusText: 'Checking credentials...',
			gapi_token_id: action.data.googletoken_id,
			gapi_token_access: action.data.googletoken_access,
		};
	case LOGIN_USER_SUCCESS:
		// console.log(action.payload);
		return {
			...state,
			isRequestPending: false,
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
			isRequestPending: false,
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
			isRequestPending: false,
			jwt: null,
			userName: null,
			userId: null,
			email: null,
			needsRelogin: false,
			statusText: 'You have been successfully logged out.',
		};
	case RESET_REQUEST_API.REQUEST:
		return {
			...state,
			isRequestPending: true,
		};
	case RESET_REQUEST_API.SUCCESS: {
		const statusText = (action.data.response && action.data.response.join(', '));

		return {
			...state,
			isAuthenticated: false,
			isRequestPending: false,
			isResetRequestSent: true,
			jwt: null,
			userName: null,
			userId: null,
			email: null,
			needsRelogin: false,
			statusText,
		};
	}
	case RESET_API.REQUEST: {
		return {
			...state,
			isRequestPending: true,
		};
	}
	case RESET_API.SUCCESS: {

		//redirect without key
		if (action.data.isSuccess) {
			const { protocol, host, pathname } = window.location;
			const refreshLoc = `${protocol}//${host}${pathname}`;
			window.location = refreshLoc;
		}

		return {
			...state,
			userName: action.data.userName,
			email: action.data.email,
			realName: action.data.realName,
			isRequestPending: false,
		};
	}
	case RESET_API.FAILURE: {
		return {
			...state,
			isResetKeyValid: false,
			statusText: 'Invalid reset key. Please enter your credentials.',
			isRequestPending: false,
		};
	}
	default: {
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
	}
}

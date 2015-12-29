
import jwtDecode from 'jwt-decode';

const initialState = {
	auth: {
		token: null,
		userName: null,
		isAuthenticated: false,
		isAuthenticating: false,
		statusText: null,
	},
};

export function auth(state = initialState, action) {
	// console.log(state);
	switch (action.type) {
	case 'LOGIN_USER_REQUEST':
		return {
			...state,
			auth: {
				...state.auth,
				isAuthenticating: true,
				statusText: null,
			},
		};
	case 'LOGIN_USER_SUCCESS':
		return {
			...state,
			auth: {
				...state.auth,
				isAuthenticating: false,
				isAuthenticated: true,
				token: action.payload.token,
				userName: jwtDecode(action.payload.token).userName,
				statusText: 'You have been successfully logged in.',
			},
		};
	case 'LOGIN_USER_FAILURE':
		return {
			...state,
			auth: {
				...state.auth,
				isAuthenticating: false,
				isAuthenticated: false,
				token: null,
				userName: null,
				statusText: `Authentication Error: ${action.payload.status} ${action.payload.statusText}`,
			},
		};
	case 'LOGOUT_USER':
		return {
			...state,
			auth: {
				...state.auth,
				isAuthenticated: false,
				token: null,
				userName: null,
				statusText: 'You have been successfully logged out.',
			},
		};
	default:
		return state;
	}
}

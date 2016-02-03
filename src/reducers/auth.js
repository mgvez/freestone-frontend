
const initialState = {
	jwt: null,
	userName: null,
	isAuthenticated: false,
	isAuthenticating: false,
	statusText: null,
};

export function auth(state = initialState, action) {
	// console.log(state);
	switch (action.type) {
	case 'UNAUTHORIZED':
		return {
			...state,
			isAuthenticated: false,
			jwt: null,
			userName: null,
			statusText: 'Unauthorized',
		};
	case 'LOGIN_USER_REQUEST':
		return {
			...state,
			isAuthenticating: true,
			statusText: null,
		};
	case 'LOGIN_USER_SUCCESS':
		return {
			...state,
			isAuthenticating: false,
			isAuthenticated: true,
			jwt: action.payload.jwt,
			userName: action.payload.token.userName,
			statusText: 'You have been successfully logged in.',
		};
	case 'LOGIN_USER_FAILURE':
		return {
			...state,
			isAuthenticating: false,
			isAuthenticated: false,
			jwt: null,
			userName: null,
			statusText: `Authentication Error: ${action.payload.status} ${action.payload.statusText}`,
		};
	case 'LOGOUT_USER':
		return {
			...state,
			isAuthenticated: false,
			jwt: null,
			userName: null,
			statusText: 'You have been successfully logged out.',
		};
	default:
		return state;
	}
}

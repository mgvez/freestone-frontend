
import reqwest from 'reqwest';
import { receiveToken, loginUserFailure } from 'actions/auth';

function getEndpoint(route) {
	let hostname = window.location.hostname;
	if (hostname === 'localhost') {
		hostname = 'freestone_dev.freestone-2';
	}
	// console.log(window.location);
	return `${window.location.protocol}//${hostname}/admin/${route}`;
}


function callApi(route, data, jwt) {
	// console.log('post data', data);
	// console.log(`JWT: ${jwt}`);
	const method = data ? 'post' : 'get';
	const headers = { 'Accept': 'application/json' };
	if (jwt) {
		headers.Authorization = `Bearer ${jwt}`;
	}

	return reqwest({
		url: getEndpoint(route),
		crossOrigin: true,
		method,
		data,
		headers,
	});
}

export const FREESTONE_API = Symbol('Freestone API');

export default store => next => action => {
	const callAPI = action[FREESTONE_API];
	if (typeof callAPI === 'undefined') {
		// console.log(action);
		return next(action);
	}

	const { route, data, types } = callAPI;

	if (!Array.isArray(types) || types.length !== 3) {
		throw new Error('Expected an array of three action types.');
	}
	if (!types.every(type => typeof type === 'string')) {
		// console.log(types);
		throw new Error('Expected action types to be strings.');
	}

	function actionWith(vals) {
		const finalAction = Object.assign({}, action, vals);
		delete finalAction[FREESTONE_API];
		// console.log(finalAction);
		return finalAction;
	}

	const [requestType, successType, failureType] = types;
	next(actionWith({ data, type: requestType }));
	const jwt = store.getState().auth.jwt;

	return callApi(route, data, jwt).then(
		res => {
			if (res.jwt) {
				next(receiveToken(res.jwt));
			}
			next(actionWith({
				type: successType,
				data: res.data,
			}));
			return res.data;
		},
		error => {
			// console.log(`ERROR ${error.status} ${error.statusText}`);
			if (error.status === 401) {
				next(loginUserFailure(error));
			} else {
				next(actionWith({
					type: failureType,
					data,
					error: error || 'Something bad happened',
				}));
			}
			return error;
		}
	);
};

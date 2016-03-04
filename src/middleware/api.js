
//basé sur redux-api-middleware, mais comme pas de release depuis un bout, pis que le official release fonctionne pas (as of 2016-01-13), j'ai réécrit

import reqwest from 'reqwest';
import { receiveToken, loginUserFailure } from 'actions/auth';

function getEndpoint(route) {
	let hostname = window.location.hostname;
	if (hostname === 'localhost') {
		// hostname = 'celeste.freestone-2';
		hostname = 'freestone_dev.freestone-2';
	}
	// console.log(window.location);
	return `${window.location.protocol}//${hostname}/admin/${route}`;
}


function callApi(route, data, jwt) {
	// console.log(`post data ${route}`, data);
	// console.log(`JWT: ${jwt}`);
	const method = data ? 'post' : 'get';
	const headers = { 'Accept': 'application/json' };
	if (jwt) {
		headers.Authorization = `Bearer ${jwt}`;
	}

	// console.log(data instanceof FormData);

	return reqwest({
		url: getEndpoint(route),
		crossOrigin: true,
		processData: !(data instanceof FormData), // les Formdata doivent pas etre processés pour que ca marche
		method,		
		data,
		headers,
	});
}

export const FREESTONE_API = Symbol('Freestone API');
export const FREESTONE_API_REQUEST = 'FREESTONE_API_REQUEST';
export const FREESTONE_API_SUCCESS = 'FREESTONE_API_SUCCESS';
export const FREESTONE_API_FAILURE = 'FREESTONE_API_FAILURE';
export const FREESTONE_API_FATAL_FAILURE = 'FREESTONE_API_FATAL_FAILURE';

export default store => next => action => {
	const callAPI = action[FREESTONE_API];
	if (typeof callAPI === 'undefined') {
		// console.log(action);
		return next(action);
	}

	function actionWith(vals) {
		const finalAction = Object.assign({}, action, vals);
		delete finalAction[FREESTONE_API];
		// console.log(finalAction);
		return finalAction;
	}

	const { route, data, types, bailout } = callAPI;


	if (!Array.isArray(types) || types.length !== 3) {
		throw new Error('Expected an array of three action types.');
	}

	let [requestType, successType, failureType] = types;
	requestType = requestType || FREESTONE_API_REQUEST;
	successType = successType || FREESTONE_API_SUCCESS;
	failureType = failureType || FREESTONE_API_FAILURE;

	try {
		if ((typeof bailout === 'boolean' && bailout) || (typeof bailout === 'function' && bailout(store.getState()))) {
			throw new Error('Bailout');
		}

		if (!types.every(type => typeof type === 'string')) {
			// console.log(types);
			// throw new Error('Expected action types to be strings.');
		}

	} catch (e) {
		next(actionWith({
			type: requestType,
			data: e,
		}));
		return Promise.reject(e);
	}

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
		}
	).catch(
		error => {
			// console.log(`ERROR ${error.status} ${error.statusText}`);
			if (error.status === 401) {
				next(loginUserFailure(error));
			} else {
				next(actionWith({
					type: failureType,
					data,
					error,
				}));
				next(actionWith({
					type: FREESTONE_API_FAILURE,
					data,
					error,
				}));
			}
			return error;
		}
	);
};

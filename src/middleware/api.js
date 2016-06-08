
//basé sur redux-api-middleware, mais comme pas de release depuis un bout, pis que le official release fonctionne pas (as of 2016-01-13), j'ai réécrit

import reqwest from 'reqwest';
import { receiveToken, loginUserFailure } from 'actions/auth';
import sha1 from 'sha1';
import { getApiUrl } from 'freestone/settings';

function getEndpoint(route) {
	const hostname = getApiUrl();
	// console.log(window.location);
	return `${hostname}/${route}`;
}


function callApi(route, data, jwt, successType) {
	// console.log(`post data ${route}`, data);
	// console.log(`JWT: ${jwt}`);
	const method = data ? 'post' : 'get';
	const headers = { 'Accept': 'application/json' };
	if (jwt) {
		headers.Authorization = `Bearer ${jwt}`;
	}

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

const processing = {};


export default store => next => action => {
	const callAPI = action[FREESTONE_API];
	if (typeof callAPI === 'undefined') {
		// console.log(action);
		return next(action);
	}
	const { route, data, types, bailout } = callAPI;

	function actionWith(vals) {
		const finalAction = Object.assign({}, action, vals);
		delete finalAction[FREESTONE_API];
		// console.log(finalAction);
		return finalAction;
	}

	let [requestType, successType, failureType] = types;
	requestType = requestType || FREESTONE_API_REQUEST;
	successType = successType || FREESTONE_API_SUCCESS;
	failureType = failureType || FREESTONE_API_FAILURE;	

	const hash = sha1(route + ':::' + successType + ':::' + JSON.stringify(data));

	// console.log(`issuing ${successType}`, route, processing[hash]);

	if (!Array.isArray(types) || types.length !== 3) {
		throw new Error('Expected an array of three action types.');
	}

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

	if (processing[hash]) return processing[hash];

	next(actionWith({ data, type: requestType }));
	const jwt = store.getState().auth.jwt;

	processing[hash] = callApi(route, data, jwt, successType).then(
		res => {
			if (res.jwt) {
				next(receiveToken(res.jwt));
			}

			if (typeof res === 'string') {
				throw new Error(res);
			}
			// console.log(`%c${route} next`, 'color:green');

			next(actionWith({
				type: successType,
				data: res.data,
			}));
			processing[hash] = null;
			return res.data;
		}
	).catch(
		error => {
			console.log(`ERROR ${error.status} ${error.statusText}`);
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
			processing[hash] = null;
			return error;
		}
	);

	return processing[hash];
};

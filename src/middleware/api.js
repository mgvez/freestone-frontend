
//basé sur redux-api-middleware, mais comme pas de release depuis un bout, pis que le official release fonctionne pas (as of 2016-01-13), j'ai réécrit
import Promise from 'bluebird';
import sha1 from 'sha1';

import { receiveToken, loginUserFailure } from '../actions/auth';
import { CLEAR_ERRORS } from '../actions/errors';
import { callApi, getEndpoint } from '../freestone/api';


export const FREESTONE_API = Symbol('Freestone API');
export const FREESTONE_API_REQUEST = 'FREESTONE_API_REQUEST';
export const FREESTONE_API_SUCCESS = 'FREESTONE_API_SUCCESS';
export const FREESTONE_API_FAILURE = 'FREESTONE_API_FAILURE';
export const FREESTONE_API_FATAL_FAILURE = 'FREESTONE_API_FATAL_FAILURE';

const processing = {};

let isError = false;

export default store => next => action => { // eslint-disable-line
	//if clear errors, unflag recoverable error state
	if (action.type === CLEAR_ERRORS) {
		isError = false;
	}

	const apiActionData = action[FREESTONE_API];
	if (typeof apiActionData === 'undefined') {
		// console.log(action);
		return next(action);
	}
	const { route, data, types, redirectOnError } = apiActionData;

	function actionWith(vals) {
		const finalAction = Object.assign({}, action, vals);
		delete finalAction[FREESTONE_API];
		// console.log(finalAction);
		return finalAction;
	}
	// console.log(types);
	let { REQUEST: requestType, SUCCESS: successType, FAILURE: failureType } = types;
	const { isSilent } = types;
	requestType = requestType || FREESTONE_API_REQUEST;
	successType = successType || FREESTONE_API_SUCCESS;
	failureType = failureType || FREESTONE_API_FAILURE;
	// console.log(requestType, successType);


	const finalRoute = getEndpoint(route);
	// console.log(finalRoute);
	const hash = sha1(finalRoute + ':::' + successType + ':::' + JSON.stringify(data));

	//when API has had a fatal error, we don't retry any API call until errors are cleared (to avoid eternal calls)
	if (isError) {
		return Promise.reject(new Error('Api has had a failure.'));
	}

	//api call has already been requested and has not resolved yet. Return the previous, identical call
	if (processing[hash]) return processing[hash];

	next(actionWith({ data, type: requestType }));
	//enforce que le default API_REQUEST est triggeré si le request type est spécifique
	if (FREESTONE_API_REQUEST !== requestType) {
		next(actionWith({ data: { route: finalRoute }, type: FREESTONE_API_REQUEST }));
	}

	processing[hash] = callApi(finalRoute, data, route).then(
		res => {
			// console.log(res);
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
			const msg = error.status ? `${error.message} ${error.status} ${error.statusText}` : error.message;
			console.log(`%cERROR ${msg}`, 'color:red;font-weight:bold');// eslint-disable-line
			console.log('for request %c %s %c %s %s', 'color:blue;', route, 'color:violet', requestType, successType);// eslint-disable-line
			console.groupCollapsed('View complete error');// eslint-disable-line
			console.log('request data', data);// eslint-disable-line
			console.trace(error); // eslint-disable-line
			console.groupEnd();// eslint-disable-line

			// console.log(error.responseText);
			if (error.status === 401) {
				next(loginUserFailure(error));
			} else {

				//if error is silent, don't prevent further API calls, as is the case when we are displaying errors
				isError = !isSilent && true;

				//always next with specified failure type
				next(actionWith({
					type: failureType,
					data,
					error,
					redirectOnError,
				}));

				//specific error type if not an API error type, we also need to throw an API error
				if (!isSilent && failureType !== FREESTONE_API_FAILURE && failureType !== FREESTONE_API_FATAL_FAILURE) {
					next(actionWith({
						type: FREESTONE_API_FAILURE,
						data,
						error,
						redirectOnError,
					}));
				}
			}
			processing[hash] = null;
			return error;
			// throw error;
		}
	);

	return processing[hash];
};

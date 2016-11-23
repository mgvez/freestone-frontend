import { getWebsiteUrl } from 'freestone/settings';
import reqwest from 'reqwest';
import Promise from 'bluebird';

let store;
export function setStore(s) {
	store = s;
}

function getJWT() {
	// console.log(store);
	return store.getState().auth.jwt;
}

export function getApiUrl() {
	return getWebsiteUrl() + '/api';
}

function getEndpoint(route) {
	const hostname = getApiUrl();
	// console.log(window.location);
	return `${hostname}/${route}`;
}

export function callApi(route, data) {
	// console.log(`post data ${route}`, data);
	// console.log(`JWT: ${jwt}`);
	const method = data ? 'post' : 'get';
	const headers = { Accept: 'application/json' };
	const jwt = getJWT();
	if (jwt) {
		headers.Authorization = `Bearer ${jwt}`;
	}

	return new Promise((resolve, reject) => {
		reqwest({
			url: getEndpoint(route),
			crossOrigin: true,
			processData: !(data instanceof FormData), // les Formdata doivent pas etre processés pour que ca marche
			method,
			data,
			headers,
		}).then(resolve).catch(res => {
			console.log(res);
			const err = new Error('API Error');
			err.status = res.status;
			err.statusText = res.statusText;
			err.responseText = res.responseText;
			try {
				const jsonResponse = JSON.parse(res.response);
				err.responseText = jsonResponse && jsonResponse.message;
				err.response = jsonResponse && jsonResponse.message;
				err.details = jsonResponse && jsonResponse.details;
			} catch (e) {
				err.response = res.response;
			}
			// console.log(err);
			reject(err);
		});
	});
}

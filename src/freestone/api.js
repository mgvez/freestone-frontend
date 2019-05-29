import reqwest from 'reqwest';
import Promise from 'bluebird';
import { getWebsiteUrl } from './settings';

export const ADMIN_API = 'admin';
export const FRONTEND_API = 'frontend';
const API_PATH = 'fsapi';
const IS_PROFILING = false;

let store;
export function setStore(s) {
	store = s;
}

function getJWT() {
	// console.log(store);
	return store.getState().freestone.auth.jwt;
}

export function getAdminUrl() {
	return getWebsiteUrl() + API_PATH + '/';
}

export function getFrontendUrl() {
	return getWebsiteUrl();
}

export function getEndpoint(route) {
	let hostname;
	let slashedRoute = route;

	//les routes peuvent être soit sur l'admin de simoneau (pour les calls de save, etc) ou sur l'api de twig (fetch du data)
	slashedRoute = slashedRoute.split('/');
	if (slashedRoute[0] === FRONTEND_API) {
		hostname = getFrontendUrl();
		slashedRoute.shift();
	} else {
		if (slashedRoute[0] === ADMIN_API) slashedRoute.shift();
		hostname = getAdminUrl();
	}

	slashedRoute = slashedRoute.join('/');


	if (~slashedRoute.indexOf('?')) {
		slashedRoute = slashedRoute.split('?');
		slashedRoute.splice(1, 0, '/');
		slashedRoute.splice(2, 0, '?');
		slashedRoute = slashedRoute.join('');
	} else {
		slashedRoute += '/';
	}
	// console.log(`${hostname}${slashedRoute}`);
	// console.log(route);
	return `${hostname}${slashedRoute}`;
}


export function callApi(route, data, label) {
	// console.log(`post data ${route}`, data);
	// console.log(`JWT: ${jwt}`);
	const method = 'post';//data ? 'post' : 'get';
	const headers = { Accept: 'application/json' };
	const jwt = getJWT();
	if (jwt) {
		headers.AuthorizationFreestone = `Bearer ${jwt}`;
		// headers.Authorization = `Bearer ${jwt}`;
	}
	const start = new Date();
	return new Promise((resolve, reject) => {
		reqwest({
			url: route,
			crossOrigin: true,
			processData: !(data instanceof FormData), // les Formdata doivent pas etre processés pour que ca marche
			method,
			data,
			headers,
		}).then((r) => {
			
			// console.log(`${label}: %c ${dur}ms`, 'color: blue; font-weight: bold;');// eslint-disable-line
			// console.log(r.profile);
			if (r.profile && IS_PROFILING) {
				const end = new Date();
				const dur = end - start;
				console.group(`${label}: ${dur}ms`);// eslint-disable-line
				// const total = r.profile.shift();
				r.profile.reduce((prevTime, item) => {

					const d = Math.ceil(item.dur * 1000);
					const relTime = Math.ceil(item.rtime * 1000);
					// const 
					console.log(`${item.label}: @${relTime}ms => %c ${d}ms`, 'color: blue; font-weight: bold;');// eslint-disable-line
					return relTime;
				}, 0);
				console.groupEnd();// eslint-disable-line
				// console.log(r);
			}
			resolve(r);
		}).catch(res => {
			console.log(`Error with route ${route}`);// eslint-disable-line
			console.log(res);// eslint-disable-line
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


import { pushPath } from 'redux-simple-router';
import reqwest from 'reqwest';
import { loginUserFailure, receiveToken, getJWT } from './auth';

function getAdminPath() {
	let hostname = window.location.hostname;
	if (hostname === 'localhost') {
		hostname = 'freestone_dev.freestone-2';
	}
	// console.log(window.location);
	return `${window.location.protocol}//${hostname}/admin`;
}


function fetchProtectedDataRequest() {
	return {
		type: 'FETCH_DATA_REQUEST',
	};
}

export function ajax(route, data) {
	return (dispatch) => {
		dispatch(fetchProtectedDataRequest());

		const adminPath = getAdminPath();
		const jwt = getJWT();
		console.log(data);

		const method = data ? 'post' : 'get';
		const headers = { 'Accept': 'application/json' };
		if (jwt) {
			headers.Authorization = `Bearer ${jwt}`;
		}

		return reqwest({
			url: `${adminPath}/${route}`,
			credentials: 'include',
			crossOrigin: true,
			method,
			data,
			headers,
		})
		.then(response => {
			console.log(response);
			receiveToken(response.jwt, dispatch);
			return response.data;
		})
		.catch(error => {
			console.error(error.responseText);
			if (error.status === 401) {
				dispatch(loginUserFailure(error));
				dispatch(pushPath('/login'));
			} else {
				throw error;
			}
		});
	};
}

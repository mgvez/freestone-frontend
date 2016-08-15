import { FREESTONE_API, FREESTONE_API_FATAL_FAILURE } from 'middleware/api';

import { push as pushPath } from 'react-router-redux';

export const ADD_NAV = 'ADD_NAV';
export const TOGGLE_NAV = 'TOGGLE_NAV';
export const LOCK_SCROLL = 'LOCK_SCROLL';

export function fetchNav() {
	return (dispatch) => {
		// console.log('fetch nav');
		return dispatch({
			[FREESTONE_API]: {
				types: ['api::fetch-nav', ADD_NAV, FREESTONE_API_FATAL_FAILURE],
				route: 'nav',
			},
		});
	};
}

//s'assure que l'app se souvient du scroll quand on va revenir dans un component
export function lockScroll(path, scroll) {
	return (dispatch) => {
		return dispatch({
			type: LOCK_SCROLL,
			data: {
				path,
				scroll,
			},
		});
	};
}

export function toggleCollapse(itemId) {
	return (dispatch) => {
		return dispatch({
			type: TOGGLE_NAV,
			data: itemId,
		});
	};
}

export function goTo(pathname) {
	return (dispatch) => {
		return dispatch(pushPath({
			pathname,
		}));
	};
}

import { push as pushPath } from 'connected-react-router';
import { FREESTONE_API } from '../middleware/api';

import { createRequestTypes } from './apiAction';

export const NAV_API = createRequestTypes('NAV_API');

export const TOGGLE_NAV = 'TOGGLE_NAV';
export const LOCK_SCROLL = 'LOCK_SCROLL';
export const CLEAR_LIST = 'CLEAR_LIST';
export const REMEMBER_LIST_PAGE = 'REMEMBER_LIST_PAGE';
export const ADD_PAGE_HASH_PATH = 'ADD_PAGE_HASH_PATH';

export function fetchNav() {
	return (dispatch) => {
		// console.log('fetch nav');
		return dispatch({
			[FREESTONE_API]: {
				types: NAV_API,
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

export function clearList() {
	return (dispatch) => {
		return dispatch({
			type: CLEAR_LIST,
			data: null,
		});
	};
}

export function rememberListPage(tableName, recId, path) {
	return (dispatch) => {
		// console.log(tableName);
		return dispatch({
			type: REMEMBER_LIST_PAGE,
			data: {
				tableName,
				recId,
				path,
			},
		});
	};
}

/**
Il est possible de se souvenir de la location d'une page (page admin) pour y revenir après un save (si la page trigger un open de formulaire) Au lieu de revenir à un id de page, on revient à l'adresse au complet (parce qu'il serait difficile de mettre les params de url du iframe dans la route de react)
 */
export function setPageHash(hash, pageId, path) {
	return (dispatch) => {
		// console.log(hash);
		return dispatch({
			type: ADD_PAGE_HASH_PATH,
			data: {
				hash,
				path,
				pageId,
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

export function goTo(loc) {
	const params = typeof pathname === 'string' ? { patname: loc } : loc;
	return (dispatch) => {
		return dispatch(pushPath(params));
	};
}

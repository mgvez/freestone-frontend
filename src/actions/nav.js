import { FREESTONE_API } from 'middleware/api';
import { push as pushPath } from 'react-router-redux';

export const ADD_NAV = 'ADD_NAV';
export const TOGGLE_NAV = 'TOGGLE_NAV';

export function fetchNav() {
	return (dispatch) => {
		// console.log('fetch nav');
		return dispatch({
			[FREESTONE_API]: {
				types: [null, ADD_NAV, null],
				route: 'nav',
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
	return (dispatch) => {
		return dispatch(pushPath({
			pathname: loc.path,
			state: {
				scroll: loc.scroll || 0,
			},
		}));
	};
}

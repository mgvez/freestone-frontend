import { FREESTONE_API } from 'middleware/api';

export function fetchNav() {
	return (dispatch) => {
		// console.log('fetch nav');
		return dispatch({
			[FREESTONE_API]: {
				types: [null, 'ADD_NAV', null],
				route: 'nav',
			},
		});
	};
}


export function toggleCollapse(itemId) {
	return (dispatch) => {
		return dispatch({
			type: 'TOGGLE_NAV',
			data: itemId,
		});
	};
}

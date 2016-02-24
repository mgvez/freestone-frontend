import { FREESTONE_API } from 'middleware/api';

export function fetchNav() {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: [null, 'ADD_NAV', null],
				route: 'nav',
			},
		});
	};
}

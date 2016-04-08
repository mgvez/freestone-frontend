import { FREESTONE_API } from 'middleware/api';

export const ADD_ENV = 'ADD_ENV';

export function fetchEnv() {
	return (dispatch) => {
		// console.log('fetch env');
		return dispatch({
			[FREESTONE_API]: {
				types: [null, ADD_ENV, null],
				route: 'env',
			},
		});
	};
}

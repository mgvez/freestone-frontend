import { FREESTONE_API } from 'middleware/api';

export function fetchEnv() {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: [null, 'ADD_ENV', null],
				route: 'env',
			},
		});
	};
}

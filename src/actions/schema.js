import { FREESTONE_API, FREESTONE_API_FATAL_FAILURE } from 'middleware/api';

export function fetchTable(name) {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: [null, 'RECEIVE_SCHEMA', FREESTONE_API_FATAL_FAILURE],
				route: `table/${name}`,
			},
		});
	};

}

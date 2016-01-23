import { FREESTONE_API, FREESTONE_API_FATAL_FAILURE } from 'middleware/api';

export function fetchList(table, search = '', page = 1) {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: [null, 'RECEIVE_RECORD_LIST', FREESTONE_API_FATAL_FAILURE],
				route: `list/${table}/${page}?${search}`,
			},
		});
	};

}

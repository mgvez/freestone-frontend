import { FREESTONE_API, FREESTONE_API_FATAL_FAILURE } from 'middleware/api';

export function fetchForeignOptions(fieldId, search = '') {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: [null, 'RECEIVE_FOREIGN_OPTIONS', FREESTONE_API_FATAL_FAILURE],
				route: `optionList/${fieldId}/${search}`,
			},
		});
	};
}

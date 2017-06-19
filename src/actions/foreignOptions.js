import { FREESTONE_API, FREESTONE_API_FATAL_FAILURE } from '../middleware/api';

export const RECEIVE_FOREIGN_OPTIONS = 'RECEIVE_FOREIGN_OPTIONS';

export function fetchForeignOptions(fieldId, search = '') {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: ['api::fetch-foreign-options', RECEIVE_FOREIGN_OPTIONS, FREESTONE_API_FATAL_FAILURE],
				route: `optionList/${fieldId}/${search}`,
			},
		});
	};
}

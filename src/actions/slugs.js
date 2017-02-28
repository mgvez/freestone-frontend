import { push as pushPath } from 'react-router-redux';
import { FREESTONE_API, FREESTONE_API_FAILURE } from 'middleware/api';

export const RECEIVE_SLUG = 'RECEIVE_SLUG';

export function fetchSlug(tableNameId, recordId) {
	return (dispatch) => {
		// console.log(tableName, recordId);
		return dispatch({
			[FREESTONE_API]: {
				types: ['api::fetch-slug', RECEIVE_SLUG, FREESTONE_API_FAILURE],
				route: `slug/${tableNameId}/${recordId}`,
				data: {
				},
			},
		});
	};
}

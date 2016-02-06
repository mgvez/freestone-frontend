import { FREESTONE_API, FREESTONE_API_FATAL_FAILURE } from 'middleware/api';

export function saveRecord(tableName, id, parentTable = 0) {
	return (dispatch) => {

		// console.log('fetch', tableName, id, parentTable);

		return dispatch({
			[FREESTONE_API]: {
				types: [null, 'RECEIVE_RECORD', FREESTONE_API_FATAL_FAILURE],
				route: `record/${tableName}/${parentTable}/${id}`,
			},
		});
	};
}

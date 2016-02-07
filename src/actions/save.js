import { FREESTONE_API, FREESTONE_API_FATAL_FAILURE } from 'middleware/api';

export function saveRecord(tableName, record) {
	return (dispatch) => {

		// console.log('fetch', tableName, id, parentTable);

		return dispatch({
			[FREESTONE_API]: {
				types: [null, 'SAVE_RECORD', FREESTONE_API_FATAL_FAILURE],
				route: `save/${tableName}`,
				data: record,
			},
		});
	};
}

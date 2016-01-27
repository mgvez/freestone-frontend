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

export function fetchRecord(table, id, parentTable = 0) {
	return (dispatch) => {

		//dbg
		dispatch({
			type: 'RECEIVE_RECORD',
			data: {
				tableName: 'typical_rel',
				parentId: 30,
				records: null,
			},
		});
		dispatch({
			type: 'RECEIVE_RECORD',
			data: {
				tableName: 'typical_rel',
				parentId: 32,
				records: [
					{
						prikey: 20,
						val: 'ok',
					},
				],
			},
		});

		return dispatch({
			[FREESTONE_API]: {
				types: [null, 'RECEIVE_RECORD', FREESTONE_API_FATAL_FAILURE],
				route: `record/${table}/${parentTable}/${id}`,
			},
		});
	};
}

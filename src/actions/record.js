import { FREESTONE_API, FREESTONE_API_FATAL_FAILURE } from 'middleware/api';

export function fetchList(tableName, search = '', page = 1) {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: [null, 'RECEIVE_RECORD_LIST', FREESTONE_API_FATAL_FAILURE],
				route: `list/${tableName}/${page}?${search}`,
			},
		});
	};
}

export function setFieldVal(tableName, recordId, fieldName, val) {
	return (dispatch) => {
		return dispatch({
			type: 'SET_FIELD_VALUE',
			data: { tableName, recordId, fieldName, val },
		});
	};
}

export function setShownRecord(tableName, parentRecordId, recordId) {
	return (dispatch) => {
		return dispatch({
			type: 'SET_SHOWN_RECORD',
			data: { tableName, parentRecordId, recordId },
		});
	};
}

export function addRecord(tableName, newRecord) {
	return (dispatch) => {
		return dispatch({
			type: 'RECEIVE_RECORD',
			data: { tableName, records: [newRecord] },
		});
	};
}

export function fetchRecord(tableName, id, parentTable = 0) {
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

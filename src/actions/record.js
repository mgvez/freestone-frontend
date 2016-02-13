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

export function setFieldVal(tableId, recordId, fieldId, val) {
	return (dispatch) => {
		return dispatch({
			type: 'SET_FIELD_VALUE',
			data: { tableId, recordId, fieldId, val },
		});
	};
}

export function setShownRecord(tableId, parentRecordId, recordId) {
	return (dispatch) => {
		return dispatch({
			type: 'SET_SHOWN_RECORD',
			data: { tableId, parentRecordId, recordId },
		});
	};
}

export function addRecord(tableId, newRecord) {
	return (dispatch) => {
		return dispatch({
			type: 'RECEIVE_RECORD',
			data: { tableId, records: [newRecord] },
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

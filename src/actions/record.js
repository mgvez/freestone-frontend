import { FREESTONE_API, FREESTONE_API_FATAL_FAILURE } from 'middleware/api';

export const REQUEST_RECORD_LIST = 'REQUEST_RECORD_LIST';
export const RECEIVE_RECORD_LIST = 'RECEIVE_RECORD_LIST';
export const SET_FIELD_VALUE = 'SET_FIELD_VALUE';
export const SET_SHOWN_RECORD = 'SET_SHOWN_RECORD';
export const RECEIVE_RECORD = 'RECEIVE_RECORD';
export const SET_RECORD_DELETED = 'SET_RECORD_DELETED';
export const RECEIVE_MTM_OPTIONS = 'RECEIVE_MTM_OPTIONS';


export function fetchList(tableName, search = '', page = 1) {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: [REQUEST_RECORD_LIST, RECEIVE_RECORD_LIST, FREESTONE_API_FATAL_FAILURE],
				route: `list/${tableName}/${page}?search=${search}`,
			},
		});
	};
}

export function setFieldVal(tableId, recordId, fieldId, val) {
	return (dispatch) => {
		return dispatch({
			type: SET_FIELD_VALUE,
			data: { tableId, recordId, fieldId, val },
		});
	};
}

export function setShownRecord(tableId, parentRecordId, recordId) {
	return (dispatch) => {
		return dispatch({
			type: SET_SHOWN_RECORD,
			data: { tableId, parentRecordId, recordId },
		});
	};
}

export function addRecord(tableId, newRecord) {
	return (dispatch) => {
		return dispatch({
			type: RECEIVE_RECORD,
			data: { tableId, records: [newRecord] },
		});
	};
}

export function setRecordDeleted(tableId, recordId) {
	return (dispatch) => {
		return dispatch({
			type: SET_RECORD_DELETED,
			data: { tableId, recordId },
		});
	};
}

export function fetchRecord(tableName, id, parentTable = 0) {
	return (dispatch) => {

		// console.log('fetch', tableName, id, parentTable);

		return dispatch({
			[FREESTONE_API]: {
				types: [null, RECEIVE_RECORD, FREESTONE_API_FATAL_FAILURE],
				route: `record/${tableName}/${parentTable}/${id}`,
			},
		});
	};
}

export function fetchMtmOptions(tableName) {
	return (dispatch) => {

		return dispatch({
			[FREESTONE_API]: {
				types: [null, RECEIVE_MTM_OPTIONS, FREESTONE_API_FATAL_FAILURE],
				route: `mtmOptions/${tableName}`,
			},
		});
	};
}

export function setOrder(tableId, fieldId, records) {
	return (dispatch) => {
		let order = 10;
		records.forEach((record) => {
			// console.log(tableId, recordId, fieldId, val);
			const val = String(order);

			if (record.order !== val) {
				dispatch({
					type: SET_FIELD_VALUE,
					data: { tableId, recordId: record.id, fieldId, val },
				});
			}

			order += 10;
		});

	};
}

import { push as pushPath } from 'react-router-redux';
import { FREESTONE_API, FREESTONE_API_FAILURE, FREESTONE_API_FATAL_FAILURE } from 'middleware/api';

export const REQUEST_RECORD_LIST = 'REQUEST_RECORD_LIST';
export const RECEIVE_RECORD_LIST = 'RECEIVE_RECORD_LIST';
export const SET_FIELD_VALUE = 'SET_FIELD_VALUE';
export const SET_SHOWN_RECORD = 'SET_SHOWN_RECORD';
export const RECEIVE_RECORD = 'RECEIVE_RECORD';
export const RECEIVE_MTM_RECORDS = 'RECEIVE_MTM_RECORDS';
export const SET_RECORD_DELETED = 'SET_RECORD_DELETED';
export const RECEIVE_MTM_OPTIONS = 'RECEIVE_MTM_OPTIONS';
export const TOGGLE_MTM_VALUE = 'TOGGLE_MTM_VALUE';
export const CANCEL_EDIT_RECORD = 'CANCEL_EDIT_RECORD';
export const SWAPPED_ANIMATED = 'SWAPPED_ANIMATED';


export function fetchList(tableName, search = '', page = 1) {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: [REQUEST_RECORD_LIST, RECEIVE_RECORD_LIST, FREESTONE_API_FAILURE],
				route: `list/${tableName}/${page}?search=${search}`,
			},
		});
	};
}

export function cancelEdit(records) {
	return (dispatch) => {
		dispatch({
			[FREESTONE_API]: {
				types: [REQUEST_RECORD_LIST, RECEIVE_RECORD_LIST, FREESTONE_API_FAILURE],
				route: 'lock',
				data: {
					records,
				},
			},
		});

		return dispatch({
			type: CANCEL_EDIT_RECORD,
			data: {
				records,
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

export function toggleMtm(tableId, parentTableId, parentRecordId, optionId) {
	return (dispatch) => {
		return dispatch({
			type: TOGGLE_MTM_VALUE,
			data: { tableId, parentTableId, parentRecordId, optionId },
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
			data: {
				tables: [
					{ tableId, records: [newRecord] },
				],
			},
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
		// console.log(`record/${tableName}/${parentTable}/${id}`);
		return dispatch({
			[FREESTONE_API]: {
				types: ['api::fetch-record', RECEIVE_RECORD, FREESTONE_API_FATAL_FAILURE],
				route: `record/${tableName}/${parentTable}/${id}`,
				redirectOnError: `list/${tableName}`,
			},
		});
	};
}

export function duplicateRecord(tableName, id) {
	return (dispatch) => {
		// console.log(`record/${tableName}/${parentTable}/${id}`);
		return dispatch({
			[FREESTONE_API]: {
				types: ['api::duplicate-record', RECEIVE_RECORD, FREESTONE_API_FAILURE],
				route: `duplicate/${tableName}/${id}`,
			},
		}).then((res) => {
			// console.log(res);
			const { rootRecordId } = res;
			return dispatch(pushPath(`edit/${tableName}/${rootRecordId}`));

		});
	};
}

export function fetchMtmRecords(tableName, id, parentTable = 0) {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: ['api::fetch-mtm-records', RECEIVE_MTM_RECORDS, FREESTONE_API_FAILURE],
				route: `record/${tableName}/${parentTable}/${id}`,
				redirectOnError: `list/${parentTable}`,
			},
		});
	};
}

export function fetchMtmOptions(tableName) {
	return (dispatch) => {

		return dispatch({
			[FREESTONE_API]: {
				types: ['api::fetch-mtm-options', RECEIVE_MTM_OPTIONS, FREESTONE_API_FAILURE],
				route: `mtmOptions/${tableName}`,
				redirectOnError: '/',
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

export function swapAnimated() {
	return (dispatch) => {
		return dispatch({
			type: SWAPPED_ANIMATED,
		});
	};
}

import { push as pushPath } from 'react-router-redux';
import { FREESTONE_API } from '../middleware/api';
import { createRequestTypes } from './apiAction';


export const SET_FIELD_VALUE = 'SET_FIELD_VALUE';
export const SET_SHOWN_RECORD = 'SET_SHOWN_RECORD';
export const RECEIVE_RECORD = 'RECEIVE_RECORD';
export const SET_RECORD_DELETED = 'SET_RECORD_DELETED';
export const TOGGLE_MTM_VALUE = 'TOGGLE_MTM_VALUE';
export const CANCEL_EDIT_RECORD = 'CANCEL_EDIT_RECORD';
export const SWAPPED_ANIMATED = 'SWAPPED_ANIMATED';

export const RECORD_LIST_API = createRequestTypes('RECORD_LIST_API');
export const RECORD_SINGLE_API = createRequestTypes('RECORD_SINGLE_API');
export const RECORD_REVISION_LIST_API = createRequestTypes('RECORD_REVISION_LIST_API');
export const MTM_RECORD_API = createRequestTypes('MTM_RECORD_API');
export const MTM_OPTIONS_API = createRequestTypes('MTM_OPTIONS_API');


export function fetchList(tableName, search = '', page = 1) {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: RECORD_LIST_API,
				route: `list/${tableName}/${page}?search=${search}`,
			},
		});
	};
}

export function cancelEdit(records) {
	return (dispatch) => {
		dispatch({
			[FREESTONE_API]: {
				types: RECORD_LIST_API,
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
			type: RECORD_SINGLE_API.SUCCESS,
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
				types: RECORD_SINGLE_API,
				route: `record/${tableName}/${parentTable}/${id}`,
				redirectOnError: `list/${tableName}`,
			},
		});
	};
}

export function fetchRecordRevisionList(tableName, id) {
	return (dispatch) => {
		// console.log(`record/${tableName}/${parentTable}/${id}`);
		return dispatch({
			[FREESTONE_API]: {
				types: RECORD_REVISION_LIST_API,
				route: `recordRevision/list/${tableName}/${id}`,
			},
		});
	};
}

export function duplicateRecord(tableName, id) {
	return (dispatch) => {
		// console.log(`record/${tableName}/${parentTable}/${id}`);
		return dispatch({
			[FREESTONE_API]: {
				types: RECORD_SINGLE_API,
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
				types: MTM_RECORD_API,
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
				types: MTM_OPTIONS_API,
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

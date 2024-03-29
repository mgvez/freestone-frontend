import { push as pushPath } from 'connected-react-router';
import { FREESTONE_API } from '../middleware/api';
import { createRequestTypes } from './apiAction';
import { EDITED_PSEUDOFIELD_ALIAS, PREVIEW_EDITED_PSEUDOFIELD_ALIAS } from '../freestone/schemaProps';

export const SET_FIELD_VALUE = 'SET_FIELD_VALUE';
export const SET_QUICKEDIT_FIELD_VALUE = 'SET_QUICKEDIT_FIELD_VALUE';

export const SET_SHOWN_RECORD = 'SET_SHOWN_RECORD';
export const TOGGLE_SHOWN_RECORD = 'TOGGLE_SHOWN_RECORD';

export const RECEIVE_RECORD = 'RECEIVE_RECORD';
export const ADD_RECORD = 'ADD_RECORD';
export const SET_RECORD_DELETED = 'SET_RECORD_DELETED';
export const TOGGLE_MTM_VALUE = 'TOGGLE_MTM_VALUE';
export const CANCEL_EDIT_RECORD = 'CANCEL_EDIT_RECORD';
export const SWAPPED_ANIMATED = 'SWAPPED_ANIMATED';

export const RECORD_INFO_API = createRequestTypes('RECORD_INFO_API');
export const RECORD_LIST_API = createRequestTypes('RECORD_LIST_API');
export const RECORD_SINGLE_API = createRequestTypes('RECORD_SINGLE_API');
export const MTM_RECORD_API = createRequestTypes('MTM_RECORD_API');
export const MTM_OPTIONS_API = createRequestTypes('MTM_OPTIONS_API');


export function fetchList(tableName, search = '', filter = null, page = 1, order = null) {
	return (dispatch) => {
		const route = `list/${tableName}?page=${page}&search=${search}&order=${order}&filter=${filter}`;
		// console.log(route);
		return dispatch({
			[FREESTONE_API]: {
				types: RECORD_LIST_API,
				route,
			},
		});
	};
}

export function fetchRecordInfo(tableName, recordId) {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: RECORD_INFO_API,
				route: `recordInfo/${tableName}/${recordId}`,
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

export function setQuickeditFieldVal(tableId, recordId, fieldId, val) {
	return (dispatch) => {
		return dispatch({
			type: SET_QUICKEDIT_FIELD_VALUE,
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

/*
sets a SINGLE record to be shown amongst list of children. Used when viewing one record at a time, i.e. in tabs list
*/
export function setShownRecord(tableId, parentRecordId, recordId, language) {
	return (dispatch) => {
		return dispatch({
			type: SET_SHOWN_RECORD,
			data: { tableId, parentRecordId, recordId, language },
		});
	};
}

/*
toggle a record to be shown/hidden amongst the list of shown childre. Used when possible to view more than one record at a time
*/
export function toggleShownRecord(tableId, parentRecordId, recordId, language) {
	return (dispatch) => {
		return dispatch({
			type: TOGGLE_SHOWN_RECORD,
			data: { tableId, parentRecordId, recordId, language },
		});
	};
}

export function addRecord(tableId, newRecord) {
	// console.log(newRecord);
	const addingRecord = {
		...newRecord,
		[EDITED_PSEUDOFIELD_ALIAS]: true,
		[PREVIEW_EDITED_PSEUDOFIELD_ALIAS]: true,
	};
	return (dispatch) => {
		return dispatch({
			type: RECORD_SINGLE_API.SUCCESS,
			data: {
				tables: [
					{ tableId, records: [addingRecord] },
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
				redirectOnError: `/list/${tableName}`,
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
			return dispatch(pushPath(`/edit/${tableName}/${rootRecordId}`));

		});
	};
}

export function fetchMtmRecords(tableName, id, parentTable = 0) {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: MTM_RECORD_API,
				route: `record/${tableName}/${parentTable}/${id}`,
				redirectOnError: `/list/${parentTable}`,
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

import { FREESTONE_API } from 'middleware/api';
import { sendRecordFiles } from 'actions/send-file';
import { push as pushPath } from 'react-router-redux';

import { CLEAR_SCHEMA } from 'actions/schema';

export const SAVE_RECORD_REQUEST = 'SAVE_RECORD_REQUEST';
export const SAVE_RECORD_SUCCESS = 'SAVE_RECORD_SUCCESS';
export const SAVE_RECORD_ERROR = 'SAVE_RECORD_ERROR';

export const SWAP_ORDER_REQUEST = 'SWAP_ORDER_REQUEST';
export const SWAP_ORDER_SUCCESS = 'SWAP_ORDER_SUCCESS';
export const SWAP_ORDER_ERROR = 'SWAP_ORDER_ERROR';

export const DELETE_RECORD_REQUEST = 'DELETE_RECORD_REQUEST';
export const DELETE_RECORD_SUCCESS = 'DELETE_RECORD_SUCCESS';
export const DELETE_RECORD_ERROR = 'DELETE_RECORD_ERROR';

export const INIT_SAVE = 'INIT_SAVE';


export function saveRecord(table, tree, records, deleted, callback) {
	return (dispatch) => {
		// console.log(tree);
		// console.log(records);
		// console.log(deleted);

		const tableName = table.name;
		const { isMeta } = table;
		
		if (!table || !tree || !tree.tableId || !tree.recordId || !records || !records[tree.tableId] || !records[tree.tableId][tree.recordId]) {
			dispatch(pushPath(`list/${tableName}`));
			return null;
		}

		dispatch({
			type: INIT_SAVE,
		});

		return sendRecordFiles(dispatch, records).then(filesResult => {
			// console.log(filesResult);

			const fileNames = filesResult.reduce((carry, fileResult) => {
				carry[fileResult.tmpName] = fileResult.name;
				return carry;
			}, {});
			// console.log(tree, records);
			const onSaved = dispatch({
				[FREESTONE_API]: {
					types: [SAVE_RECORD_REQUEST, SAVE_RECORD_SUCCESS, SAVE_RECORD_ERROR],
					route: `save/${tableName}`,
					data: {
						tree,
						records,
						deleted,
						tableName,
						fileNames,
					},
				},
			});

			onSaved.then(() => {
				if (callback) {
					callback();
				} else {
					const backPath = `list/${table.name}`;
					setTimeout(() => {
						//si table savée est meta (zva_...)
						if (isMeta) {
							dispatch({
								type: CLEAR_SCHEMA,
							});
						}
						// console.log(backPath);
						dispatch(pushPath({
							pathname: backPath,
							state: {
								scroll: 0,
							},
						}));
					}, 1000);
				}
			});

			
			return onSaved;
		});
	};
}

export function swapOrder(tableName, recordId, direction) {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: [SWAP_ORDER_REQUEST, SWAP_ORDER_SUCCESS, SWAP_ORDER_ERROR],
				route: `swapOrder/${tableName}`,
				data: {
					tableName,
					recordId,
					direction,
				},
			},
		});
	};
}

export function deleteRecord(tableName, recordId) {
	return (dispatch) => {
		// console.log(tableName, recordId);
		return dispatch({
			[FREESTONE_API]: {
				types: [DELETE_RECORD_REQUEST, DELETE_RECORD_SUCCESS, DELETE_RECORD_ERROR],
				route: `delete/${tableName}/${recordId}`,
				data: {
					tableName,
					recordId,
				},
			},
		});
	};
}

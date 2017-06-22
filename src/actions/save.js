import { push as pushPath } from 'react-router-redux';
import { FREESTONE_API } from '../middleware/api';
import { sendRecordFiles } from './sendFile';
import { CLEAR_SCHEMA } from './schema';
import { createRequestTypes } from './apiAction';

export const INIT_SAVE = 'INIT_SAVE';
export const SAVE_RECORD_API = createRequestTypes('SAVE_RECORD_API');
export const SWAP_ORDER_API = createRequestTypes('SWAP_ORDER_API');
export const DELETE_RECORD_API = createRequestTypes('DELETE_RECORD_API');


function catchError(res) {

	if (res instanceof Error) {
		console.log('%cSAVE ERROR', 'color:magenta;font-weight:bold');// eslint-disable-line
		console.log(res);// eslint-disable-line
		return res;
	}
	return null;

}


export function saveRecord(table, tree, records, deleted, permissions, isTemporary, gotoOnFinish, callback) {
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

			const filesErr = catchError(filesResult);
			if (filesErr) return filesErr;

			const fileNames = filesResult.reduce((carry, fileResult) => {
				carry[fileResult.tmpName] = fileResult.name;
				return carry;
			}, {});
			// console.log(tree, records);

			const data = JSON.stringify({
				tree,
				records,
				deleted,
				permissions,
				tableName,
				fileNames,
				isTemporary,
			});

			const onSaved = dispatch({
				[FREESTONE_API]: {
					types: SAVE_RECORD_API,
					route: `save/${tableName}`,
					data: { data },
				},
			});

			onSaved.then((res) => {
				// console.log(callback);
				const saveErr = catchError(res);
				if (saveErr) return saveErr;

				if (callback) {
					callback(res.mainRecord);
				} else {
					const backPath = gotoOnFinish || `list/${table.name}`;
					// console.log(backPath, gotoOnFinish);
					//si table savée est meta (zva_...)
					if (isMeta) {
						dispatch({
							type: CLEAR_SCHEMA,
						});
					}
					// console.log(backPath);
					dispatch(pushPath({ pathname: backPath }));

				}
				return null;
			});

			return onSaved;
		});
	};
}

export function swapOrder(tableName, recordId, direction) {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: SWAP_ORDER_API,
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

/**
 Updates the value for a single field in a record
*/
export function saveSingleValue(tableIdOrName, recordId, fieldId, value) {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: SAVE_RECORD_API,
				route: `saveValue/${tableIdOrName}/${recordId}/${fieldId}`,
				data: {
					value,
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
				types: [DELETE_RECORD_REQUEST, DELETE_RECORD_API.SUCCESS, DELETE_RECORD_ERROR],
				route: `delete/${tableName}/${recordId}`,
				data: {
					tableName,
					recordId,
				},
			},
		});
	};
}

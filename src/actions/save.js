import { FREESTONE_API, FREESTONE_API_FATAL_FAILURE } from 'middleware/api';
import { sendRecordFiles } from 'actions/send-file';
import { push as pushPath } from 'react-router-redux';


export function saveRecord(tableName, tree, records) {
	return (dispatch) => {

		if (!tree || !tree.tableId || !tree.recordId || !records || !records[tree.tableId] || !records[tree.tableId][tree.recordId]) {
			pushPath(`list/${tableName}`);
			return null;
		}

		dispatch({
			type: 'INIT_SAVE',
		});

		return sendRecordFiles(dispatch, records).then(filesResult => {
			// console.log(filesResult);

			const fileNames = filesResult.reduce((carry, fileResult) => {
				carry[fileResult.tmpName] = fileResult.name;
				return carry;
			}, {});
			// console.log(tree, records);
			return dispatch({
				[FREESTONE_API]: {
					types: ['SAVE_RECORD_REQUEST', 'SAVE_RECORD_SUCCESS', 'SAVE_RECORD_ERROR'],
					route: `save/${tableName}`,
					data: {
						tree,
						records,
						tableName,
						fileNames,
					},
				},
			});
		});

	};
}

export function swapOrder(tableName, recordId, direction) {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: ['SWAP_ORDER_REQUEST', 'SWAP_ORDER_SUCCESS', 'SWAP_ORDER_ERROR'],
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

import { FREESTONE_API, FREESTONE_API_FATAL_FAILURE } from 'middleware/api';
import { sendRecordFiles } from 'actions/send-file';

export function saveRecord(tableName, tree, records) {
	return (dispatch) => {
		console.log(tree);
		console.log(records);

		dispatch({
			type: 'INIT_SAVE',
		});

		return sendRecordFiles(dispatch, records).then(filesResult => {
			// console.log(filesResult);

			const fileNames = filesResult.reduce((carry, fileResult) => {
				carry[fileResult.tmpName] = fileResult.name;
				return carry;
			}, {});

			return dispatch({
				[FREESTONE_API]: {
					types: ['SAVE_RECORD_REQUEST', 'SAVE_RECORD', FREESTONE_API_FATAL_FAILURE],
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

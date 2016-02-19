import { FREESTONE_API, FREESTONE_API_FATAL_FAILURE } from 'middleware/api';
import { Promise } from 'bluebird';
import { sendFile } from 'actions/send-file';

export function saveRecord(tableName, tree, records) {
	return (dispatch) => {

		//traverse le tree et retrieve les input file

		// const fileUploads = Promise.all(fileInputIds.map((field) => {

		// 	return sendFile(field.fieldId, field.recId)(dispatch);

		// }).filter(p => p));

		// fileUploads.then((uploadRes) => {
		// 	console.log(uploadRes);
		// });

		// console.log('fetch', tableName, id, parentTable);

		// return dispatch({
		// 	[FREESTONE_API]: {
		// 		types: [null, 'SAVE_RECORD', FREESTONE_API_FATAL_FAILURE],
		// 		route: `save/${tableName}`,
		// 		data: record,
		// 	},
		// });
	};
}

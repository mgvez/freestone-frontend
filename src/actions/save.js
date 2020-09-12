import { push as pushPath } from 'connected-react-router';
import { FREESTONE_API } from '../middleware/api';
import { sendRecordFiles } from './sendFile';
import { CLEAR_SCHEMA } from './schema';
import { createRequestTypes } from './apiAction';

export const INIT_SAVE = 'INIT_SAVE';
export const SAVE_RECORD_API = createRequestTypes('SAVE_RECORD_API');
export const PROCESS_IMAGES_API = createRequestTypes('PROCESS_IMAGES_API', true);
export const SAVE_SINGLE_VALUE_RECORD_API = createRequestTypes('SAVE_SINGLE_VALUE_RECORD_API');
export const SAVE_PREVIEW_API = createRequestTypes('SAVE_PREVIEW_API');
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

//Hook record before sending to db (for example to encrypt value)
function parseRecordBeforeSave(data) {
	const hook = window.freestone && window.freestone.hooks && window.freestone.hooks.parseRecordBeforeSave;
	if (!hook) return data;
	return window.freestone.hooks.parseRecordBeforeSave(data);
}


//process all image resizes/optimizations that need to be created by backend
function processImages(data, dispatch) {
	// console.log(images);
	if (!data || !data.images || !data.images.length) return Promise.resolve(null);
	const onProcessed = dispatch({
		[FREESTONE_API]: {
			types: PROCESS_IMAGES_API,
			route: 'imagesTransform',
			data: { data: JSON.stringify(data) },
		},
	});

	return onProcessed.then(res => {
		if (res.images && res.images.length) {
			return processImages(res, dispatch);
		}
		// console.log(res);
		return res;
	});

}

export function saveRecord(table, tree, records, deleted, permissions, isTemporary, gotoOnFinish, callback) {
	return (dispatch) => {
		// console.log(tree);
		// console.log(records);
		// console.log(deleted);

		const tableName = table.name;
		const { isMeta } = table;

		if (!table || !tree || !tree.tableId || !tree.recordId || !records || !records[tree.tableId] || !records[tree.tableId][tree.recordId]) {
			// console.log('saving');
			dispatch(pushPath(`list/${tableName}`));
			return null;
		}

		dispatch({
			type: INIT_SAVE,
		});

		return sendRecordFiles(dispatch, records).then(filesResult => {
			console.log(filesResult);
			console.log(records);
			const filesErr = catchError(filesResult);
			if (filesErr) return filesErr;

			const fileNames = filesResult.reduce((carry, fileResult) => {
				carry[fileResult.tmpName] = fileResult.name;
				return carry;
			}, {});
			// console.log(tree, records);

			const data = parseRecordBeforeSave(JSON.stringify({
				tree,
				records,
				deleted,
				permissions,
				tableName,
				fileNames,
				isTemporary,
			}));

			const actionTypes = !isTemporary ? SAVE_RECORD_API : SAVE_PREVIEW_API;

			const onSaved = dispatch({
				[FREESTONE_API]: {
					types: actionTypes,
					route: `save/${tableName}`,
					data: { data },
				},
			});

			onSaved.then((res) => {
				const saveErr = catchError(res);
				if (saveErr) return saveErr;

				// console.log(res.images);
				
				//process image optimizations
				return processImages(res && res.images && res.images, dispatch).then(() => {
					// console.log(imagesResult);
					const skipDefault = callback && callback(res.mainRecord, res.slugs);
					if (!skipDefault) {
						let pathname = '';
						let search = '';
						if (gotoOnFinish && gotoOnFinish.pathname) {
							pathname = gotoOnFinish.pathname;
							search = gotoOnFinish.search;
						} else {
							pathname = gotoOnFinish || `/list/${table.name}`;
						}
						pathname = pathname.replace('{{recordId}}', res.mainRecord.recordId);
						
						//si table savée est meta (zva_...)
						if (isMeta) {
							dispatch({
								type: CLEAR_SCHEMA,
							});
						}

						dispatch(pushPath({ pathname, search }));

					}
					return null;
				});
			});

			return onSaved;
		});
	};
}


export function swapOrder(tableName, recordId, direction, onComplete) {
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
		}).then(() => {
			onComplete();
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
				types: SAVE_SINGLE_VALUE_RECORD_API,
				route: `saveValue/${tableIdOrName}/${recordId}/${fieldId}`,
				data: {
					value,
				},
			},
		});
	};
}

/**
 Updates the value for a single record, without children nor files. Only values
*/
export function saveSingleRecord(tableIdOrName, recordId, record) {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: SAVE_RECORD_API,
				route: `saveRecord/${tableIdOrName}/${recordId}`,
				data: {
					record,
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
				types: DELETE_RECORD_API,
				route: `delete/${tableName}/${recordId}`,
				data: {
					tableName,
					recordId,
				},
			},
		});
	};
}

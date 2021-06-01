import { Promise } from 'bluebird';

import { FREESTONE_API } from '../middleware/api';
import { SavedFileInput } from '../freestone/fileInputs';
import { createRequestTypes } from './apiAction';

export const FILE_API = createRequestTypes('FILE_API');
export const SAVE_BANK_IMAGES_API = createRequestTypes('SAVE_BANK_IMAGES_API');

const CHUNK_SIZE = 1024 * 1024;

function sendCrop(dispatch, fileDef) {
	const data = {
		...fileDef,
		totalSize: fileDef.file && fileDef.file.size,
	};
	const reqAction = dispatch({
		[FREESTONE_API]: {
			types: FILE_API,
			route: 'file/crop',
			data,
		},
	});
	return reqAction;

}

function sendChunk(dispatch, fileDef, rangeStart = 0) {
	// console.log(fileDef, rangeStart);
	const { file, tmpName, fieldId, crop } = fileDef;

	if (!file) {
		if (crop) return sendCrop(dispatch, fileDef);
	}

	let rangeEnd = rangeStart + CHUNK_SIZE;
	if (rangeEnd > file.size) {
		rangeEnd = file.size;
	}
	const chunk = file.slice(rangeStart, rangeEnd);
	// console.log(rangeStart);
	// console.log(file.size);

	const data = new FormData();
	data.append('chunk', chunk);
	data.append('name', file.name);
	data.append('fieldId', fieldId);
	data.append('totalSize', file.size);
	data.append('currentSize', rangeEnd);
	data.append('rangeStart', rangeStart);
	data.append('tmpName', tmpName);

	const chunkReqAction = dispatch({
		[FREESTONE_API]: {
			types: FILE_API,
			route: 'file',
			data,
		},
	});

	if (rangeEnd === file.size) {
		if (crop) return chunkReqAction.then(() => sendCrop(dispatch, fileDef));
		return chunkReqAction;
	}

	return chunkReqAction.then(() => sendChunk(dispatch, fileDef, rangeEnd));
}

function getPostFileDef(record, recordId, tableId) {
	return Object.keys(record).map(fieldId => {
		const val = record[fieldId];
		const fileInput = val && new SavedFileInput(val);
		// console.log(fieldId, val);

		// no need to check for field type. Input will exist only if it was created, the value being a hash
		const file = fileInput && fileInput.getFile();
		// but if we have no file per se, it is not impossible that the field is a bank image with a crop, whose value is held in fileinputs
		const crop = fileInput && fileInput.getCropSettings();

		if (!file && !crop) return null;
		const bankImgId = fileInput.getBankItemId();
		// console.log(crop, tmpName);
		return {
			tmpName: val,
			bankImgId,
			file,
			fileName: file && file.name,
			fieldId,
			recordId,
			tableId,
			crop,
		};
	}).filter(r => r);
}

export function sendRecordFiles(dispatch, records) {
	//loop et send files
	const allFiles = Object.keys(records).reduce((recordsFiles, tableId) => {
		const tableRecords = records[tableId];
		return Object.keys(tableRecords).reduce((tableFiles, recordId) => {
			const record = tableRecords[recordId];
			// console.log(record);
			return tableFiles.concat(getPostFileDef(record, recordId, tableId));
		}, recordsFiles);
	}, []);

	// console.log(allFiles);
	return Promise.mapSeries(allFiles, fileDef => {
		return sendChunk(dispatch, fileDef);
	});
}

/*
	Takes images that were sent to the back and save them in the bank, and return their IDs
*/
export function saveFilesAsBankImages(records) {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: SAVE_BANK_IMAGES_API,
				route: 'bank/img/save',
				data: {
					records,
				},
			},
		});
	};
}

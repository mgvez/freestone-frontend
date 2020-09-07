import { Promise } from 'bluebird';

import { FREESTONE_API } from '../middleware/api';
import { getFileVal, getCropSettings } from '../freestone/fileInputs';
import { createRequestTypes } from './apiAction';

export const FILE_API = createRequestTypes('FILE_API');

const CHUNK_SIZE = 1024 * 1024;

function sendCrop(dispatch, fileDef) {
	const data = {
		...fileDef,
		totalSize: fileDef.file.size,
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
	const { file, tmpName, fieldId, crop } = fileDef;
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


export function sendRecordFiles(dispatch, records) {
	//loop et send files
	const allFiles = Object.keys(records).reduce((recordsFiles, tableId) => {
		const tableRecords = records[tableId];
		return Object.keys(tableRecords).reduce((tableFiles, recordId) => {
			const record = tableRecords[recordId];
			// console.log(record);
			return tableFiles.concat(Object.keys(record).map(fieldId => {
				const tmpName = record[fieldId];
				//on n'a pas besoin de vérifier si le champ est d'un type particulier: le getfile retournera un file basé sur la value seulement, qui est un hash
				const file = tmpName && getFileVal(tmpName);
				if (!file) return null;
				const crop = getCropSettings(tmpName);
				console.log(crop, tmpName);
				return {
					tmpName,
					file,
					fileName: file.name,
					fieldId,
					recordId,
					tableId,
					crop,
				};
			}).filter(r => r));
		}, recordsFiles);
	}, []);

	// console.log(allFiles);
	return Promise.mapSeries(allFiles, fileDef => {
		return sendChunk(dispatch, fileDef);
	});

}


import { FREESTONE_API } from '../middleware/api';
import { createRequestTypes } from './apiAction';
import { SavedFileInput } from '../freestone/fileInputs';
import { setFieldVal } from './record';
import { sendRecordFiles, saveFilesAsBankImages } from './sendFile';
import { catchError } from './save';

const FETCH_CONTENTBLOCK_PREVIEW = createRequestTypes('FETCH_CONTENTBLOCK_PREVIEW');
export const SET_PREVIEW_WIDTH = 'SET_PREVIEW_WIDTH';

export const PREVIEW_IFRAME = 'iframe';
export const PREVIEW_WIN = 'window';

export const SET_RECORD_IS_PREVIEWING = 'SET_RECORD_IS_PREVIEWING';
export const SET_CURRENT_PREVIEW = 'SET_CURRENT_PREVIEW';
export const SET_PREVIEW_VIEW_TYPE = 'SET_PREVIEW_VIEW_TYPE';


export function setIsPreviewing(status) {
	return (dispatch) => {
		return dispatch({
			type: SET_RECORD_IS_PREVIEWING,
			data: status,
		});
	};
}

export function setCurrentPreview(tableId, recordId, type = PREVIEW_IFRAME) {
	return (dispatch) => {
		return dispatch({
			type: SET_CURRENT_PREVIEW,
			data: { tableId, recordId, type },
		});
	};
}

export function setPreviewViewType(type) {
	return (dispatch) => {
		return dispatch({
			type: SET_PREVIEW_VIEW_TYPE,
			data: { type },
		});
	};
}

export function fetchContentBlockPreview(jsonRecord, records) {
	return (dispatch) => {
		const onFiles = sendRecordFiles(dispatch, records).then(filesResult => {
			if (!filesResult || !filesResult.length) return;
			return saveFilesAsBankImages(filesResult)(dispatch);

		}).then(bankImageResult => {
			if (!bankImageResult || !bankImageResult.records) return;
			const bankImageRecords = bankImageResult.records;

			// loop in records that refer to just uploaded images and change these file's values
			Object.entries(records).forEach(([tableId, tableRecords]) => {
				// loop in this table's records
				Object.entries(tableRecords).forEach(([recordId, record]) => {
					// loop in this record's fields
					Object.entries(record).forEach(([fieldId, val]) => {
						// for each saved bank record, check if this 
						const fileInput = val && new SavedFileInput(val);
						if (fileInput) {
							const bankImageRecord = bankImageRecords.find(rec => rec.tmpName === val);
							const bankImageId = bankImageRecord && bankImageRecord.id;
							if (bankImageId) {
								// now this image is saved in the bank, we use the bank's id instead of the temp file
								setFieldVal(tableId, recordId, fieldId, bankImageId)(dispatch);
							}
						}

					});
				});
			});

		});

		return dispatch({
			[FREESTONE_API]: {
				types: FETCH_CONTENTBLOCK_PREVIEW,
				route: 'contentBlockPreview',
				data: { data: jsonRecord },
			},
		});
	};
}

export function setPreviewWidth(ratio) {
	return (dispatch) => {
		return dispatch({
			type: SET_PREVIEW_WIDTH,
			data: {
				ratio,
			},
		});
	};
}

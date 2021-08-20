
import { FREESTONE_API } from '../middleware/api';
import { createRequestTypes } from './apiAction';
import { SavedFileInput } from '../freestone/fileInputs';
import { setFieldVal } from './record';
import { sendRecordFiles, saveFilesAsBankImages } from './sendFile';
import { catchError } from './save';

const FETCH_CONTENTBLOCK_PREVIEW = createRequestTypes('FETCH_CONTENTBLOCK_PREVIEW');
export const SET_PREVIEW_WIDTH = 'SET_PREVIEW_WIDTH';


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

export function setPreviewWidth(tableId, ratio) {
	return (dispatch) => {
		return dispatch({
			type: SET_PREVIEW_WIDTH,
			data: {
				tableId,
				ratio,
			},
		});
	};
}

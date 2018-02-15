import { FREESTONE_API } from '../middleware/api';
import { createRequestTypes } from './apiAction';

export const FOREIGN_OPTIONS_API = createRequestTypes('FOREIGN_OPTIONS_API');
export const FOREIGN_LABELS_API = createRequestTypes('FOREIGN_LABELS_API');


export function fetchForeignOptions(fieldId, search, val) {
	console.log('action %s search %s val %s', fieldId, search, val);
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: FOREIGN_OPTIONS_API,
				route: `optionList/${fieldId}`,
				data: {
					search,
					val,
				},
			},
		});
	};
}

export function fetchForeignLabel(fieldId, foreignRecordId) {
	// console.log(search);
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: FOREIGN_LABELS_API,
				route: `optionList/${fieldId}/${foreignRecordId}`,
			},
		});
	};
}

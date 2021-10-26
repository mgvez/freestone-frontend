import { FREESTONE_API } from '../middleware/api';
import { createRequestTypes } from './apiAction';

export const WORKING_TITLE_API = createRequestTypes('WORKING_TITLE_API');
export const CLEAR_WORKING_TITLE = 'CLEAR_WORKING_TITLE';
export const WORKING_STRUCTURED_API = createRequestTypes('WORKING_STRUCTURED_API');
export const CLEAR_WORKING_STRUCTURED = 'CLEAR_WORKING_STRUCTURED';

export function clearWorkingTitle(tableId, recordId, lang) {
	return (dispatch) => {
		return dispatch({
			type: CLEAR_WORKING_TITLE,
			data: { tableId, recordId, lang },
		});
	};
}

export function fetchWorkingTitle(tableNameId, lang, recordId, record, override) {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: WORKING_TITLE_API,
				route: `metadata/title/${tableNameId}/${recordId}/${lang}`,
				data: {
					record,
					override,
				},
			},
		});
	};
}

export function clearWorkingStructured(tableId, recordId, lang) {
	return (dispatch) => {
		return dispatch({
			type: CLEAR_WORKING_STRUCTURED,
			data: { tableId, recordId, lang },
		});
	};
}

export function fetchWorkingStructured(tableNameId, lang, recordId, record, override) {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: WORKING_STRUCTURED_API,
				route: `metadata/structured/${tableNameId}/${recordId}/${lang}`,
				data: {
					record,
					override,
				},
			},
		});
	};
}

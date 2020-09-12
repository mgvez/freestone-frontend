import { FREESTONE_API } from '../middleware/api';
import { createRequestTypes } from './apiAction';

export const BANK_IMAGE_API = createRequestTypes('BANK_IMAGE_API');
export const BANK_IMAGE_ITEM_API = createRequestTypes('BANK_IMAGE_ITEM_API');
export const BANK_FILE_API = createRequestTypes('BANK_FILE_API');
export const BANK_USES_API = createRequestTypes('BANK_USES_API');
export const BANK_CATEGORIES_API = createRequestTypes('BANK_CATEGORIES_API');
export const BANK_SETUP_SELECT = 'BANK_SETUP_SELECT';
export const BANK_CANCEL_SELECT = 'BANK_CANCEL_SELECT';


export function fetchBankImage(id, size) {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: BANK_IMAGE_API,
				route: `bank/images/thumbnail/${id}/en/${size}`,
			},
		});
	};
}
export function fetchImageBankItem(id) {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: BANK_IMAGE_ITEM_API,
				route: `bank/images/item/${id}`,
			},
		});
	};
}

export function fetchBankCategories(bankId) {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: BANK_CATEGORIES_API,
				route: `bankCategories/${bankId}`,
			},
		});
	};
}

export function fetchBankUses(bankId, itemId) {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: BANK_USES_API,
				route: `bankUses/${bankId}/${itemId}/`,
			},
		});
	};
}


export function fetchBankFile(id) {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: BANK_FILE_API,
				route: `bank/files/item/${id}`,
			},
		});
	};
}

//indicates that we are in the process of choosing a bank item to put its value in a field of a record
export function setupBankSelect(tableId, recordId, fieldId, fieldType, lang, returnTo) {
	return (dispatch) => {
		return dispatch({
			type: BANK_SETUP_SELECT,
			tableId,
			recordId,
			fieldId,
			fieldType,
			lang,
			returnTo,
		});
	};
}

export function cancelBankSelect() {
	return (dispatch) => {
		return dispatch({
			type: BANK_CANCEL_SELECT,
		});
	};
}

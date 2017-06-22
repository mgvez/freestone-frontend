import { FREESTONE_API } from '../middleware/api';
import { createRequestTypes } from './apiAction';

export const BANK_IMAGE_API = createRequestTypes('BANK_IMAGE_API');
export const BANK_FILE_API = createRequestTypes('BANK_FILE_API');
export const BANK_USES_API = createRequestTypes('BANK_USES_API');


export function fetchBankImage(id, size) {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: BANK_IMAGE_API,
				route: `bank/images/thumbnail/${id}/${size}`,
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

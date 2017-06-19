import { FREESTONE_API, FREESTONE_API_FAILURE } from '../middleware/api';

export const RECEIVE_BANK_IMAGE = 'RECEIVE_BANK_IMAGE';
export const RECEIVE_BANK_FILE = 'RECEIVE_BANK_FILE';
export const REQUEST_BANK_USES = 'REQUEST_BANK_USES';
export const RECEIVE_BANK_USES = 'RECEIVE_BANK_USES';


export function fetchBankImage(id, size) {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: ['api::fetch-bank-img', RECEIVE_BANK_IMAGE, FREESTONE_API_FAILURE],
				route: `bank/images/thumbnail/${id}/${size}`,
			},
		});
	};
}

export function fetchBankUses(bankId, itemId) {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: [REQUEST_BANK_USES, RECEIVE_BANK_USES, FREESTONE_API_FAILURE],
				route: `bankUses/${bankId}/${itemId}/`,
			},
		});
	};
}


export function fetchBankFile(id) {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: ['api::fetch-bank-file', RECEIVE_BANK_FILE, FREESTONE_API_FAILURE],
				route: `bank/files/item/${id}`,
			},
		});
	};
}

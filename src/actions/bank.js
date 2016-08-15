import { FREESTONE_API, FREESTONE_API_FAILURE } from 'middleware/api';
import { BANK_IMG_TABLE } from 'freestone/schemaProps';

export const RECEIVE_BANK_IMAGE = 'RECEIVE_BANK_IMAGE';
export const REQUEST_BANK_IMAGE = 'REQUEST_BANK_IMAGE';


export function fetchBankImage(id) {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: [REQUEST_BANK_IMAGE, RECEIVE_BANK_IMAGE, FREESTONE_API_FAILURE],
				route: `bank/images/thumbnail/${id}`,
			},
		});
	};
}

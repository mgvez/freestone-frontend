import { FREESTONE_API, FREESTONE_API_FATAL_FAILURE } from 'middleware/api';
import { BANK_IMG_TABLE } from 'freestone/schemaProps';

export const REQUEST_IMAGE_BANK_LIST = 'REQUEST_IMAGE_BANK_LIST';
export const RECEIVE_IMAGE_BANK_LIST = 'RECEIVE_IMAGE_BANK_LIST';


export function fetchImageBankList(search = '', page = 1) {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: [REQUEST_IMAGE_BANK_LIST, RECEIVE_IMAGE_BANK_LIST, FREESTONE_API_FATAL_FAILURE],
				route: `list/${BANK_IMG_TABLE}/${page}?search=${search}`,
			},
		});
	};
}

import { FREESTONE_API } from '../middleware/api';
import { createRequestTypes } from './apiAction';

export const FOREIGN_OPTIONS_API = createRequestTypes('FOREIGN_OPTIONS_API');


export function fetchForeignOptions(fieldId, search = '') {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: FOREIGN_OPTIONS_API,
				route: `optionList/${fieldId}/${search}`,
			},
		});
	};
}

import { FREESTONE_API } from '../middleware/api';
import { createRequestTypes } from './apiAction';

export const CLEAR_SCHEMA = 'CLEAR_SCHEMA';
export const SCHEMA_API = createRequestTypes('SCHEMA_API');


export function fetchTable(name) {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: SCHEMA_API,
				route: `table/${name}`,
			},
		});
	};
}

export function clearSchema() {
	return (dispatch) => {
		return dispatch({
			type: CLEAR_SCHEMA,
		});
	};
}

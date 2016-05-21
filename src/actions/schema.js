import { FREESTONE_API, FREESTONE_API_FATAL_FAILURE } from 'middleware/api';

export const RECEIVE_SCHEMA = 'RECEIVE_SCHEMA';
export const CLEAR_SCHEMA = 'CLEAR_SCHEMA';


export function fetchTable(name) {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: [`api::fetch-schema ${name}`, RECEIVE_SCHEMA, FREESTONE_API_FATAL_FAILURE],
				route: `table/${name}`,
			},
		});
	};
}

export function clearSchema(name) {
	return (dispatch) => {
		return dispatch({
			type: CLEAR_SCHEMA,
		});
	};
}

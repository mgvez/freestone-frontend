import { FREESTONE_API } from '../middleware/api';
import { createRequestTypes } from './apiAction';


export const BLOCK_FIELD_DEPS_API = createRequestTypes('BLOCK_FIELD_DEPS_API');
export const SET_SINGLE_DEPENDENCY = createRequestTypes('SET_SINGLE_DEPENDENCY');


export function fetchAllData() {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: BLOCK_FIELD_DEPS_API,
				route: 'blockFieldDeps/getValues',
			},
		});
	};
}

export function setSingleDependency(fieldId, typeId, isDisplay) {
	return (dispatch) => {
		return dispatch({
			type: SET_SINGLE_DEPENDENCY,
			data: {
				fieldId,
				typeId,
				isDisplay,
			},
		});
	};
}

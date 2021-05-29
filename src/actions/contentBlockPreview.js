
import { FREESTONE_API } from '../middleware/api';
import { createRequestTypes } from './apiAction';

export const FETCH_CONTENTBLOCK_PREVIEW = createRequestTypes('FETCH_CONTENTBLOCK_PREVIEW');


export function fetchContentBlockPreview(data) {
	return (dispatch) => {
		console.log(data);
		return dispatch({
			[FREESTONE_API]: {
				types: FETCH_CONTENTBLOCK_PREVIEW,
				route: 'contentBlockPreview',
				data,
			},
		});
	};
}

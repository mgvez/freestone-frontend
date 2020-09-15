import { FREESTONE_API } from '../middleware/api';
import { createRequestTypes } from './apiAction';


export const LATEST_MODIFS_API = createRequestTypes('LATEST_MODIFS_API');

export function fetchLatestModifs() {
	return (dispatch) => {
		return dispatch({
			[FREESTONE_API]: {
				types: LATEST_MODIFS_API,
				route: 'dashboard/latest-modifs',
			},
		});
	};
}

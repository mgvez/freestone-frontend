import { FREESTONE_API } from '../middleware/api';
import { createRequestTypes } from './apiAction';


export const LATEST_MODIFS_API = createRequestTypes('LATEST_MODIFS_API');
export const CLEAR_LATEST_MODIFS = 'CLEAR_LATEST_MODIFS';

export function fetchLatestModifs(refresh = false, maxDate = null) {
	return (dispatch) => {
		if (refresh) {
			dispatch({
				type: CLEAR_LATEST_MODIFS,
			});
		}
		return dispatch({
			[FREESTONE_API]: {
				types: LATEST_MODIFS_API,
				route: 'dashboard/latest-modifs',
				data: {
					maxDate,
				},
			},
		});
	};
}

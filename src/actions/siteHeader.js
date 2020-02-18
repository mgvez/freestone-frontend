
export const TOGGLE_NAV_VISIBILITY = 'TOGGLE_NAV_VISIBILITY';
export const TOGGLE_LOADED_RECORDS = 'TOGGLE_LOADED_RECORDS';

export function toggleNavVisibility(wantedVisibility) {
	return (dispatch) => {
		return dispatch({
			type: TOGGLE_NAV_VISIBILITY,
			data: wantedVisibility,
		});
	};
}

export function toggleLoadedRecords(wantedVisibility) {
	return (dispatch) => {
		return dispatch({
			type: TOGGLE_LOADED_RECORDS,
			data: wantedVisibility,
		});
	};
}

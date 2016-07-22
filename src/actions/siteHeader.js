
export const TOGGLE_NAV_VISIBILITY = 'TOGGLE_NAV_VISIBILITY';

export function toggleNavVisibility(wantedVisibility) {
	return (dispatch) => {
		return dispatch({
			type: TOGGLE_NAV_VISIBILITY,
			data: wantedVisibility,
		});
	};
}

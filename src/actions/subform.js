
export const SET_SUBFORM_VIEW_TYPE = 'SET_SUBFORM_VIEW_TYPE';
export const SET_SUBFORM_VISIBLE = 'SET_SUBFORM_VISIBLE';


export function setSubformViewType(tableId, type) {
	return (dispatch) => {
		return dispatch({
			type: SET_SUBFORM_VIEW_TYPE,
			data: {
				tableId,
				type,
			},
		});
	};
}

export function setSubformVisible(tableId, isVisible) {
	return (dispatch) => {
		return dispatch({
			type: SET_SUBFORM_VISIBLE,
			data: {
				tableId,
				isVisible,
			},
		});
	};
}

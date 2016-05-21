
export const SET_SUBFORM_VIEW_TYPE = 'SET_SUBFORM_VIEW_TYPE';


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

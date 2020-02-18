
export const SHOW_FIELD_GROUP = 'SHOW_FIELD_GROUP';
export const TOGGLE_FIELD_GROUP = 'TOGGLE_FIELD_GROUP';

export function showFieldGroup(groupId, tableId) {
	return (dispatch) => {
		return dispatch({
			type: SHOW_FIELD_GROUP,
			data: {
				groupId,
				tableId,
			},
		});
	};
}

export function toggleFieldGroup(groupId, tableId) {
	return (dispatch) => {
		return dispatch({
			type: TOGGLE_FIELD_GROUP,
			data: {
				groupId,
				tableId,
			},
		});
	};
}

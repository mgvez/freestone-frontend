
export const TABBED_FIELD_GROUP = 'TABBED_FIELD_GROUP';
export const TOGGLE_FIELD_GROUP = 'TOGGLE_FIELD_GROUP';

export function tabbedFieldGroups(groupId, tableId) {
	return (dispatch) => {
		return dispatch({
			type: TABBED_FIELD_GROUP,
			data: {
				groupId,
				tableId,
			},
		});
	};
}

export function toggleFieldGroups(groupId, tableId) {
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

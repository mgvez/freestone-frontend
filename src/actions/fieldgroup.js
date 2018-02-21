
export const TOGGLE_FIELD_GROUP = 'TOGGLE_FIELD_GROUP';

export function toggleFieldGroup(groupId) {
	return (dispatch) => {
		return dispatch({
			type: TOGGLE_FIELD_GROUP,
			data: {
				groupId,
			},
		});
	};
}

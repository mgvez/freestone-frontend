
export function foreignOptions(state = {}, action) {
	switch (action.type) {
	case 'UNAUTHORIZED':
		return {};
	case 'RECEIVE_FOREIGN_OPTIONS':
		if (!action.data || !action.data.fieldId) return state;
		const fieldId = action.data.fieldId;
		const newState = {
			...state,
			[fieldId]: action.data,
		};
		// console.log(newState);
		return newState;
	case 'CLEAR_DATA':
		return {};
	default:
		// console.log('no change');
		return state;
	}
}

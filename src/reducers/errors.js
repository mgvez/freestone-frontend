
export function errors(state = [], action) {
	// console.log(action);
	switch (action.type) {
	case 'FREESTONE_API_FAILURE':
		return [
			...state,
			action.error.responseText,
		];
	case 'FREESTONE_API_FATAL_FAILURE':
		return [
			...state,
			action.error.responseText,
		];
	case 'CLEAR_ERRORS':
		return [];
	default:
		// console.log('no change');
		return state;
	}
}

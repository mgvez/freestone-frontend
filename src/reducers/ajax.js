const initialState = {
	errors: [],
};

export function ajax(state = initialState, action) {
	// console.log(action);
	switch (action.type) {
	case 'FREESTONE_API_FAILURE':
		return {
			...state,
			errors: [
				// ...state.errors,
				action.error.responseText,
			],
		};
	case 'FREESTONE_API_FATAL_FAILURE':
		return {
			...state,
			errors: [
				// ...state.errors,
				action.error.responseText,
			],
		};
	case 'CLEAR_ERRORS':
		return initialState;
	default:
		// console.log('no change');
		return state;
	}
}

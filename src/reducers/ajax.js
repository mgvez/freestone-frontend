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
	default:
		// console.log('no change');
		return state;
	}
}

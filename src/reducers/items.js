const initialState = [{
	text: 'React',
	done: true,
}];

export function items(state = initialState, action) {
	// console.log(state);
	switch (action.type) {
	case 'ADD_ITEM':
		return [
			...state, {
				text: action.fields.name.value,
			},
		];
	case 'DELETE_ITEM':
		return [
			...state.slice(0, action.index),
			...state.slice(+action.index + 1),
		];

	default:
		return state;
	}
}

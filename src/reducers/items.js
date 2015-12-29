const initialState = {
	items: [{
		text: 'React',
		done: true,
	}],
};

export function items(state = initialState, action) {
	// console.log(state);
	switch (action.type) {
	case 'ADD_ITEM':
		return {
			...state,
			items: [
				...state.items, {
					text: action.fields.name.value,
				},
			],
		};

	case 'DELETE_ITEM':
		return {
			...state,
			items: [
				...state.items.slice(0, action.index),
				...state.items.slice(+action.index + 1),
			],
		};

	default:
		return state;
	}
}

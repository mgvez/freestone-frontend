const initialState = {
	navGroups: [],
};

export function freestone(state = initialState, action) {
	// console.log(action);
	switch (action.type) {
	case 'ADD_FREESTONE':
		return {
			...state,
			navGroups: action.data,
		};
	case 'ADD_TABLE':
		return {
			...state,
			tables: [
				...state.tables,
				action.data,
			],
		};
	case 'ADD_NAV_GROUP':
		return {
			...state,
			navGroups: [
				...state.navGroups,
				action.data,
			],
		};
	default:
		return state;
	}
}

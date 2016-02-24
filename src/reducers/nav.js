const initialState = {
	navGroups: [],
	tables: [],
	modules: [],
	pages: [],
};

export function nav(state = initialState, action) {
	// console.log(action);
	switch (action.type) {
	case 'UNAUTHORIZED':
		return initialState;
	case 'ADD_NAV':
		return {
			...state,
			...action.data,
		};
	case 'ADD_NAV_TABLE':
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
		// console.log('no change');
		return state;
	}
}

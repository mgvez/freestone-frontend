const initialState = {
	navGroups: [],
	tables: [],
	modules: [],
	pages: [],
};

export function freestone(state = initialState, action) {
	// console.log(action);
	switch (action.type) {
	case 'UNAUTHORIZED':
		return initialState;
	case 'ADD_FREESTONE':
		return {
			...state,
			...action.data.freestone,
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
		// console.log('no change');
		return state;
	}
}

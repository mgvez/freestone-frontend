const initialState = {
	pages: [],
	tables: [],
	tableGroups: [],
	modules: [],
};

export function freestone(state = initialState, action) {
	console.log(action);
	switch (action.type) {
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
	default:
		return state;
	}
}

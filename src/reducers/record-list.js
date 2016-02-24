
const initialState = {
	table: null,
	page: null,
	search: null,
	records: [],
};

export function recordList(state = initialState, action) {
	switch (action.type) {
	case 'UNAUTHORIZED':
	case 'SAVE_RECORD_SUCCESS':
		return initialState;
	case 'RECEIVE_RECORD_LIST':
		// console.log(action.data.qstr);
		if (!action.data) return state;
		return action.data;
	default:
		// console.log('no change');
		return state;
	}
}

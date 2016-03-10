
const initialState = {
	table: null,
	page: null,
	search: null,
	pageSize: null,
	nRecords: null,
	error: null,
	records: [],
};

export function recordList(state = initialState, action) {
	switch (action.type) {
	case 'UNAUTHORIZED':
	case 'SAVE_RECORD_SUCCESS':
	case 'SWAP_ORDER_SUCCESS':
		return initialState;
	case 'RECEIVE_RECORD_LIST':
		// console.log(action.data.nRecords);
		if (!action.data) return state;
		return action.data;
	default:
		// console.log('no change');
		return state;
	}
}

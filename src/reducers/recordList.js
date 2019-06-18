import { UNAUTHORIZED } from '../actions/auth';
import { RECORD_LIST_API, SWAPPED_ANIMATED, RECORD_INFO_API } from '../actions/record';
import { CLEAR_LIST } from '../actions/nav';
import { SAVE_RECORD_API, SWAP_ORDER_API, DELETE_RECORD_API, SAVE_SINGLE_VALUE_RECORD_API } from '../actions/save';
import { CLEAR_DATA } from '../actions/dev';

const initialState = {
	table: null,
	page: null,
	search: null,
	pageSize: null,
	nRecords: null,
	error: null,
	records: [],
	swappedRecords: null,
};

export default function(state = initialState, action) {
	switch (action.type) {
	case UNAUTHORIZED:
	case CLEAR_LIST:
	case CLEAR_DATA:
	case SAVE_RECORD_API.SUCCESS:
	case DELETE_RECORD_API.SUCCESS:
		return initialState;
	case SWAPPED_ANIMATED:
		return { ...state, swappedRecords: null };
	case SWAP_ORDER_API.SUCCESS:
		return { ...state, invalidated: true, swappedRecords: action.data.result };
	case SAVE_SINGLE_VALUE_RECORD_API.SUCCESS:
		//when toggling switches, we want to reload the records without clearing them, so as not to have a flash in the list
		return { ...state, invalidated: true };
	case RECORD_LIST_API.SUCCESS:
		// console.log(action.data.nRecords);
		if (!action.data) return state;
		return { ...action.data, invalidated: false, swappedRecords: state.swappedRecords };
	case RECORD_INFO_API.SUCCESS: {
		if (!action.data || !action.data.info || action.data.tableName !== state.table) return state;
		const { recordId } = action.data;
		return { 
			...state,
			records: state.records.map(rec => {
				const mapRecId = rec.prikey;
				if (mapRecId !== String(recordId)) return rec;
				return {
					...rec,
					...action.data.info,
				};
			}),
		};
	}
	default:
		// console.log('no change');
		return state;
	}
}

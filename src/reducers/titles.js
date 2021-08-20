
import { WORKING_TITLE_API, CLEAR_WORKING_TITLE } from '../actions/title';
import { SAVE_RECORD_API, DELETE_RECORD_API } from '../actions/save';
import { CLEAR_DATA } from '../actions/dev';
import { UNAUTHORIZED, LOGOUT_API } from '../actions/auth';
import { SET_FIELD_VALUE } from '../actions/record';

function removeRecordTitle(state, tableId, recordId, lang) {
	if (!state[tableId] || !state[tableId][recordId]) return state;

	if (lang && !state[tableId][recordId][lang]) return state;
	const newState = {
		...state,
		[tableId]: {
			...state[tableId],
		},
	};
	if (lang) {
		newState[tableId][recordId] = {
			...newState[tableId][recordId],
		};
		delete newState[tableId][recordId][lang];
	} else {
		delete newState[tableId][recordId];
	}
	return newState;

}

function removeTitles(state, records) {
	// console.log(records);
	if (!records) return state;
	return records.reduce((modifiedState, record) => {
		const { tableId, recordId } = record;
		return removeRecordTitle(modifiedState, tableId, recordId);
	}, state);
}


export default (state = {}, action) => {
	switch (action.type) {
		case CLEAR_DATA: 
		case UNAUTHORIZED:
		case LOGOUT_API.SUCCESS:
		case LOGOUT_API.REQUEST:
			return {};
		case WORKING_TITLE_API.SUCCESS: {
			const { tableId, recordId, title, lang } = action.data;
			const newState = {
				...state,
				[tableId]: {
					...state[tableId],
					[recordId]: {
						...(state[tableId] && state[tableId][recordId]),
						[lang]: title,
					},
				},
			};
			return newState;
		}
		case SAVE_RECORD_API.SUCCESS:
		case DELETE_RECORD_API.SUCCESS:
			return removeTitles(state, action.data.records);
		case SET_FIELD_VALUE: 
		case CLEAR_WORKING_TITLE: {
			const { tableId, recordId, lang } = action.data;
			return removeRecordTitle(state, tableId, recordId, lang);
		}
		default:
			return state;
	}
};

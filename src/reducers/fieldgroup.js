import { combineReducers } from 'redux';
import { TOGGLE_FIELD_GROUP, TABBED_FIELD_GROUP } from '../actions/fieldgroup';
import { CLEAR_DATA } from '../actions/dev';


function collapsedState(state = {}, action) {
	switch (action.type) {
	case TOGGLE_FIELD_GROUP: {
		const { groupId, tableId } = action.data;
		return {
			...state,
			[tableId]: groupId,
		};
	}
	default:
		return state;
	}
}

function visibleState(state = {}, action) {
	switch (action.type) {
	case CLEAR_DATA: return {};
	case TABBED_FIELD_GROUP: {
		const { groupId, tableId } = action.data;
		return {
			...state,
			[tableId]: groupId,
		};
	}
	default:
		return state;
	}
}

export default combineReducers({
	visibleState,
	collapsedState,
});

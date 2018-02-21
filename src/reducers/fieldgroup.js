import { combineReducers } from 'redux';
import { TOGGLE_FIELD_GROUP } from '../actions/fieldgroup';


function collapsedState(state = {}, action) {
	switch (action.type) {
	case TOGGLE_FIELD_GROUP: {
		const { groupId } = action.data;
		return {
			...state,
			[groupId]: !state[groupId],
		};
	}
	default:
		return state;
	}
}

export default combineReducers({
	collapsedState,
});

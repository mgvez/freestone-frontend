import { combineReducers } from 'redux';

import { 
	BLOCK_FIELD_DEPS_API,
	SET_BLOCK_FIELD_DEP,
	CLOSE_BLOCK_FIELD_DEPS_API,
	SAVE_BLOCK_FIELD_DEPS_API,
	FINISH_SAVE_BLOCK_FIELD_DEP,
	CLEAR_BLOCK_FIELD_DEP,
} from '../actions/blockFieldDeps';
import { CLEAR_DATA } from '../actions/dev';
import { UNAUTHORIZED, LOGOUT_API } from '../actions/auth';

function dependencies(state = null, action) {
	switch (action.type) {
	case BLOCK_FIELD_DEPS_API.SUCCESS: {
		const { data } = action;
		return data.dependencies;
	}
	case SET_BLOCK_FIELD_DEP: {
		const { data: { fieldId, typeId, isDisplay } } = action;
		const newState = [...(state || [])];
		const oldValueIndex = newState.findIndex(d => d.rule === String(typeId) && d.dependingFieldId === fieldId);
		const newValue = {
			rule: typeId,
			dependingFieldId: fieldId,
			isDisplay,
		};
		if (oldValueIndex === -1) {
			newState.push(newValue);
		} else {
			newState[oldValueIndex] = {
				...newState[oldValueIndex],
				...newValue,
			};
		}
		return newState;

	}
	case CLEAR_DATA:
	case UNAUTHORIZED:
	case CLOSE_BLOCK_FIELD_DEPS_API.SUCCESS:
	case LOGOUT_API.SUCCESS:
	case LOGOUT_API.REQUEST:
	case CLEAR_BLOCK_FIELD_DEP:
	// case FINISH_SAVE_BLOCK_FIELD_DEP:
	// case SAVE_BLOCK_FIELD_DEPS_API.SUCCESS:
		return null;
	default:
		return state;
	}
}

function config(state = null, action) {
	switch (action.type) {
	case BLOCK_FIELD_DEPS_API.SUCCESS: {
		const { data } = action;
		return data.config;
	}
	case CLEAR_DATA:
	case UNAUTHORIZED:
	case LOGOUT_API.SUCCESS:
	case LOGOUT_API.REQUEST:
		return null;
	default:
		return state;
	}
}

function suggestions(state = null, action) {
	switch (action.type) {
	case BLOCK_FIELD_DEPS_API.SUCCESS: {
		return state;
	}
	case CLEAR_DATA:
	case UNAUTHORIZED:
	case LOGOUT_API.SUCCESS:
	case LOGOUT_API.REQUEST:
	case CLOSE_BLOCK_FIELD_DEPS_API.SUCCESS:
	case CLEAR_BLOCK_FIELD_DEP:
	// case FINISH_SAVE_BLOCK_FIELD_DEP:
	// case SAVE_BLOCK_FIELD_DEPS_API.SUCCESS:
		return null;
	default:
		return state;
	}
}


export default combineReducers({
	dependencies,
	config,
	suggestions,
});

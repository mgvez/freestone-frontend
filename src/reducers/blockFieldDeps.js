import { combineReducers } from 'redux';

import { 
	BLOCK_FIELD_DEPS_API,
	SET_BLOCK_FIELD_DEP,
	SET_BLOCK_MULTIPLE_FIELD_DEP,
	CLOSE_BLOCK_FIELD_DEPS_API,
	SAVE_BLOCK_FIELD_DEPS_API,
	CLEAR_BLOCK_FIELD_DEP,
} from '../actions/blockFieldDeps';
import { CLEAR_DATA } from '../actions/dev';
import { UNAUTHORIZED, LOGOUT_API } from '../actions/auth';

function setSingleDependency(state, dependency) {
	const { fieldId, typeId, ...rest } = dependency;
	const newState = [...(state || [])];
	const oldValueIndex = newState.findIndex(d => d.rule === String(typeId) && d.dependingFieldId === fieldId);
	const newValue = {
		rule: typeId,
		dependingFieldId: fieldId,
		...rest,
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

function dependencies(state = null, action) {
	switch (action.type) {
		case BLOCK_FIELD_DEPS_API.SUCCESS: {
			const { data } = action;
			return data.dependencies;
		}
		case SET_BLOCK_MULTIPLE_FIELD_DEP: {
			const { data } = action;
			return data.reduce((carry, dependency) => {
				return setSingleDependency(carry, dependency);
			}, state);
		}
		case SET_BLOCK_FIELD_DEP: {
			const { data } = action;
			return setSingleDependency(state, data);
		}
		case CLEAR_DATA:
		case UNAUTHORIZED:
		case CLOSE_BLOCK_FIELD_DEPS_API.SUCCESS:
		case LOGOUT_API.SUCCESS:
		case LOGOUT_API.REQUEST:
		case CLEAR_BLOCK_FIELD_DEP:
		case SAVE_BLOCK_FIELD_DEPS_API.SUCCESS:
		// case FINISH_SAVE_BLOCK_FIELD_DEP:
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
		case CLOSE_BLOCK_FIELD_DEPS_API.SUCCESS:
		case SAVE_BLOCK_FIELD_DEPS_API.SUCCESS:
		case CLEAR_DATA:
		case UNAUTHORIZED:
		case LOGOUT_API.SUCCESS:
		case LOGOUT_API.REQUEST:
			return null;
		default:
			return state;
	}
}


export default combineReducers({
	dependencies,
	config,
});

import { combineReducers } from 'redux';
import { UNAUTHORIZED, LOGOUT_SUCCESS } from 'actions/auth';
import { CLEAR_ERRORS, CLEAR_DATA } from 'actions/dev';
import { CLEAR_SCHEMA, RECEIVE_SCHEMA } from 'actions/schema';
import { SAVE_RECORD_SUCCESS } from 'actions/save';

function tables(state = {}, action) {
	switch (action.type) {
	case UNAUTHORIZED:
		return {};
	case RECEIVE_SCHEMA:
		// console.log(action.data);
		if (!action.data.tables) return state;
		return {
			...state,
			...action.data.tables.reduce((newState, table) => {
				newState[table.id] = table;
				return newState;
			}, {}),
		};
	case SAVE_RECORD_SUCCESS:
		// console.log(action.data.mainRecord);
		if (action.data.mainRecord && action.data.mainRecord.isMeta) {
			return {};
		}
		return state;
	case CLEAR_ERRORS:
		return {};
	case CLEAR_DATA:
	case CLEAR_SCHEMA:
	case LOGOUT_SUCCESS:
		return {};
	default:
		// console.log('no change');
		return state;
	}
}

function children(state = {}, action) {
	switch (action.type) {
	case UNAUTHORIZED:
		return {};
	case RECEIVE_SCHEMA:
		// console.log(action);
		if (!action.data.children) return state;
		return {
			...state,
			...action.data.children.reduce((newState, childrenDef) => {
				newState[childrenDef.tableId] = childrenDef.children;
				return newState;
			}, {}),
		};
	case CLEAR_ERRORS:
		return {};
	case SAVE_RECORD_SUCCESS:
		// console.log(action.data.mainRecord);
		if (action.data.mainRecord && action.data.mainRecord.isMeta) {
			return {};
		}
		return state;
	case CLEAR_DATA:
	case LOGOUT_SUCCESS:
	case CLEAR_SCHEMA:
		return {};
	default:
		// console.log('no change');
		return state;
	}
}

function fields(state = {}, action) {
	switch (action.type) {
	case UNAUTHORIZED:
		return {};
	case RECEIVE_SCHEMA:
		// console.log(action.data.fields);
		if (!action.data.fields) return state;
		return {
			...state,
			...action.data.fields.reduce((newState, field) => {
				newState[field.id] = field;
				return newState;
			}, {}),
		};
	case SAVE_RECORD_SUCCESS:
		// console.log(action.data.mainRecord);
		if (action.data.mainRecord && action.data.mainRecord.isMeta) {
			return {};
		}
		return state;
	case CLEAR_ERRORS:
		return {};
	case CLEAR_DATA:
	case LOGOUT_SUCCESS:
	case CLEAR_SCHEMA:
		return {};
	default:
		// console.log('no change');
		return state;
	}
}

function fieldDependencies(state = {}, action) {
	switch (action.type) {
	case UNAUTHORIZED:
		return {};
	case RECEIVE_SCHEMA:
		// console.log(action.data.fields);
		if (!action.data.fieldDependencies) return state;
		return {
			...state,
			...action.data.fieldDependencies,
		};
	case SAVE_RECORD_SUCCESS:
		// console.log(action.data.mainRecord);
		if (action.data.mainRecord && action.data.mainRecord.isMeta) {
			return {};
		}
		return state;
	case CLEAR_ERRORS:
		return {};
	case CLEAR_DATA:
	case LOGOUT_SUCCESS:
	case CLEAR_SCHEMA:
		return {};
	default:
		// console.log('no change');
		return state;
	}
}


export default combineReducers({
	tables,
	fields,
	fieldDependencies,
	children,
});

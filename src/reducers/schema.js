import { combineReducers } from 'redux';
import { UNAUTHORIZED, LOGOUT_API } from '../actions/auth';
import { CLEAR_ERRORS, CLEAR_DATA } from '../actions/dev';
import { CLEAR_SCHEMA, SCHEMA_API } from '../actions/schema';
import { SAVE_RECORD_API } from '../actions/save';

function tables(state = {}, action) {
	switch (action.type) {
		case SCHEMA_API.SUCCESS:
			// console.log(action);
			if (!action.data || !action.data.tables) return state;
			return {
				...state,
				...action.data.tables.reduce((newState, table) => {
					newState[table.id] = table;
					return newState;
				}, {}),
			};
		case SAVE_RECORD_API.SUCCESS:
			// console.log(action.data.mainRecord);
			if (action.data.mainRecord && action.data.mainRecord.isMeta) {
				return {};
			}
			return state;
		case CLEAR_ERRORS:
			return {};
		case CLEAR_DATA:
		case CLEAR_SCHEMA:
		case UNAUTHORIZED:
		case LOGOUT_API.SUCCESS:
		case LOGOUT_API.REQUEST:
			return {};
		default:
			// console.log('no change');
			return state;
	}
}

function children(state = {}, action) {
	switch (action.type) {
		case SCHEMA_API.SUCCESS:
			// console.log(action);
			if (!action.data || !action.data.children) return state;
			return {
				...state,
				...action.data.children.reduce((newState, childrenDef) => {
					newState[childrenDef.tableId] = childrenDef.children;
					return newState;
				}, {}),
			};
		case CLEAR_ERRORS:
			return {};
		case SAVE_RECORD_API.SUCCESS:
			// console.log(action.data.mainRecord);
			if (action.data.mainRecord && action.data.mainRecord.isMeta) {
				return {};
			}
			return state;
		case CLEAR_DATA:
		case LOGOUT_API.SUCCESS:
		case LOGOUT_API.REQUEST:
		case UNAUTHORIZED:
		case CLEAR_SCHEMA:
			return {};
		default:
			// console.log('no change');
			return state;
	}
}

function fields(state = {}, action) {
	switch (action.type) {
		case SCHEMA_API.SUCCESS:
			// console.log(action.data.fields);
			if (!action.data || !action.data.fields) return state;
			return {
				...state,
				...action.data.fields.reduce((newState, field) => {

					//replaces language specification in field label, if any, because this is now added in the frontend.
					if (field.language) {
						const reg = new RegExp('\\s*\\(' + field.language + '\\)\\s*$');
						field.label = field.label && field.label.replace(reg, '');
					}

					newState[field.id] = field;
					return newState;
				}, {}),
			};
		case SAVE_RECORD_API.SUCCESS:
			// console.log(action.data.mainRecord);
			if (action.data.mainRecord && action.data.mainRecord.isMeta) {
				return {};
			}
			return state;
		case UNAUTHORIZED:
		case CLEAR_ERRORS:
		case CLEAR_DATA:
		case LOGOUT_API.SUCCESS:
		case LOGOUT_API.REQUEST:
		case CLEAR_SCHEMA:
			return {};
		default:
			// console.log('no change');
			return state;
	}
}

function fieldDependencies(state = {}, action) {
	switch (action.type) {
		case SCHEMA_API.SUCCESS:
			// console.log(action.data.fields);
			if (!action.data || !action.data.fieldDependencies) return state;
			return {
				...state,
				...action.data.fieldDependencies,
			};
		case SAVE_RECORD_API.SUCCESS:
			// console.log(action.data.mainRecord);
			if (action.data.mainRecord && action.data.mainRecord.isMeta) {
				return {};
			}
			return state;
		case CLEAR_ERRORS:
		case CLEAR_DATA:
		case LOGOUT_API.SUCCESS:
		case LOGOUT_API.REQUEST:
		case UNAUTHORIZED:
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

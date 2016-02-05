import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import { reducer as formReducer } from 'redux-form';
import { freestone } from './freestone';
import { default as schema } from './schema';
import { auth } from './auth';
import { errors } from './errors';
import { foreignOptions } from './foreign-options';
import { recordList } from './record-list';
import { default as recordForm } from './record-form';

const rootReducer = combineReducers({
	form: formReducer,
	routing: routeReducer,
	freestone,
	auth,
	schema,
	errors,
	recordList,
	recordForm,
	foreignOptions,
});

export default rootReducer;

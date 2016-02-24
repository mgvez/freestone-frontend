import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import { reducer as formReducer } from 'redux-form';
import { nav } from './nav';
import { default as schema } from './schema';
import { auth } from './auth';
import { env } from './env';
import { errors } from './errors';
import { foreignOptions } from './foreign-options';
import { recordList } from './record-list';
import { default as recordForm } from './record-form';
import save from './save';

const rootReducer = combineReducers({
	form: formReducer,
	routing: routeReducer,
	nav,
	env,
	auth,
	schema,
	errors,
	recordList,
	recordForm,
	foreignOptions,
	save,
});

export default rootReducer;

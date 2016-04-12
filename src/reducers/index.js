import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { default as nav } from './nav';
import { default as schema } from './schema';
import { auth } from './auth';
import { env } from './env';
import { errors } from './errors';
import { foreignOptions } from './foreign-options';
import { recordList } from './record-list';
import { default as recordForm } from './record-form';
import { mtmOptions } from './mtm';
import save from './save';

const rootReducer = combineReducers({
	form: formReducer,
	routing: routerReducer,
	nav,
	env,
	auth,
	schema,
	errors,
	recordList,
	recordForm,
	foreignOptions,
	save,
	mtmOptions,
});

export default rootReducer;

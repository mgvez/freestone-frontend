import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { default as nav } from './nav';
import { default as siteHeader } from './siteHeader';
import { default as schema } from './schema';
import { auth } from './auth';
import { env, userViewSettings, clientVariables } from './env';
import { errors } from './errors';
import { foreignOptions } from './foreign-options';
import { recordList } from './record-list';
import { default as recordForm } from './record-form';
import { mtmOptions } from './mtm-options';
import { default as subform } from './subform';
import { imageBankList } from './bank';
import save from './save';

const rootReducer = combineReducers({
	form: formReducer,
	routing: routerReducer,
	siteHeader,
	nav,
	env,
	userViewSettings,
	auth,
	schema,
	errors,
	recordList,
	recordForm,
	foreignOptions,
	save,
	mtmOptions,
	subform,
	imageBankList,
	clientVariables,
});

export default rootReducer;

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { default as nav } from './nav';
import { default as siteHeader } from './siteHeader';
import { default as schema } from './schema';
import { auth } from './auth';
import { env, userViewSettings, envVariables } from './env';
import { errors } from './errors';
import { foreignOptions } from './foreignOptions';
import { recordList } from './recordList';
import { default as recordForm } from './recordForm';
import { mtmOptions } from './mtmOptions';
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
	envVariables,
});

export default rootReducer;

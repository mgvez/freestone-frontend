import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { default as nav } from './nav';
import { default as siteHeader } from './siteHeader';
import { default as schema } from './schema';
import { default as translations } from './translations';
import { auth } from './auth';
import { env, userViewSettings, envVariables } from './env';
import { errors } from './errors';
import { foreignOptions } from './foreignOptions';
import { recordList } from './recordList';
import { default as recordRevision } from './recordRevision';
import { default as recordForm } from './recordForm';
import { mtmOptions } from './mtmOptions';
import { default as subform } from './subform';
import { default as bank } from './bank';
import { default as slugs } from './slugs';
import { default as permissions } from './permissions';
import save from './save';

const rootReducer = combineReducers({
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
	bank,
	envVariables,
	translations,
	recordRevision,
	slugs,
	permissions,
});

export default rootReducer;

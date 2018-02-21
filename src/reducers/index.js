import { combineReducers } from 'redux';
import nav from './nav';
import siteHeader from './siteHeader';
import schema from './schema';
import translations from './translations';
import auth from './auth';
import env from './env';
import errors from './errors';
import foreign from './foreign';
import recordList from './recordList';
import recordRevision from './recordRevision';
import recordForm from './recordForm';
import subform from './subform';
import fieldgroup from './fieldgroup';
import bank from './bank';
import slugs from './slugs';
import permissions from './permissions';
import save from './save';

const rootReducer = combineReducers({
	siteHeader,
	nav,
	env,
	auth,
	schema,
	errors,
	recordList,
	recordForm,
	foreign,
	save,
	subform,
	fieldgroup,
	bank,
	translations,
	recordRevision,
	slugs,
	permissions,
});

export default rootReducer;

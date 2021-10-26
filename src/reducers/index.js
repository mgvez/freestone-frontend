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
import recordQuickedit from './recordQuickedit';
import preview from './preview';
import contentBlockPreview from './contentBlockPreview';
import recordForm from './recordForm';
import subform from './subform';
import fieldgroup from './fieldgroup';
import bank from './bank';
import slugs from './slugs';
import metadata from './metadata';
import permissions from './permissions';
import save from './save';
import blockFieldDeps from './blockFieldDeps';
import settingsEditor from './settingsEditor';

const rootReducer = combineReducers({
	siteHeader,
	nav,
	env,
	auth,
	schema,
	errors,
	recordList,
	recordForm,
	preview,
	contentBlockPreview,
	recordQuickedit,
	foreign,
	save,
	subform,
	fieldgroup,
	bank,
	translations,
	slugs,
	metadata,
	permissions,
	blockFieldDeps,
	settingsEditor,
});

export default rootReducer;

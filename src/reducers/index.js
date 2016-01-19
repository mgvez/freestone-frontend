import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import { reducer as formReducer } from 'redux-form';
import { freestone } from './freestone';
import { default as schema } from './schema';
import { auth } from './auth';
import { ajax } from './ajax';

const rootReducer = combineReducers({
	form: formReducer,
	routing: routeReducer,
	freestone,
	auth,
	schema,
	ajax,
});

export default rootReducer;

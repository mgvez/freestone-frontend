import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import { reducer as formReducer } from 'redux-form';
import { freestone } from './freestone';
import { auth } from './auth';

const rootReducer = combineReducers({
	form: formReducer,
	routing: routeReducer,
	freestone,
	auth,
});

export default rootReducer;

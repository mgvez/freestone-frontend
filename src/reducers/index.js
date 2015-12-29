import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import { reducer as formReducer } from 'redux-form';
import { items } from './items';
import { auth } from './auth';

const rootReducer = combineReducers({
	form: formReducer,
	routing: routeReducer,
	items,
	auth,
});

export default rootReducer;

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import apiMiddleware from './middleware/api';
import authMiddleware from './middleware/auth';

// import hooksMiddleware from 'middleware/hooks';
import createLogger from 'redux-logger';
import reduxLocalstorage from 'redux-simple-localstorage';
import { routerMiddleware, routerReducer } from 'react-router-redux';

import createHistory from 'history/createHashHistory';
import rootReducer from './reducers';

export const history = createHistory();

const logger = createLogger({ collapsed: true });
const { read, write } = reduxLocalstorage('freestone');

const routeMiddleware = routerMiddleware(history);
// console.log(apiMiddleware);

const createStoreWithMiddleware = applyMiddleware(
	thunkMiddleware,
	apiMiddleware,
	// hooksMiddleware,
	authMiddleware,
	logger,
	write,
	routeMiddleware
)(createStore);

function configureStore(initialState) {
	const currentState = read() || initialState;
	//remove current routing from local storage state, to return to home at refresh if fatal error
	if (currentState && currentState.errors && currentState.errors.filter(e => e.isFatal).length) {
		delete currentState.routing;
		delete currentState.errors;
	}
	const reducers = combineReducers({
		freestone: rootReducer,
		router: routerReducer,
	});
	const store = createStoreWithMiddleware(reducers, currentState);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('./reducers', () => {
			const nextRootReducer = require('./reducers/index');
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
}


export const store = configureStore();

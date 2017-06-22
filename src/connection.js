import { hashHistory } from 'react-router';

import { syncHistoryWithStore, routerMiddleware, routerReducer } from 'react-router-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import reduxLocalstorage from 'redux-simple-localstorage';

import apiMiddleware from './middleware/api';
import authMiddleware from './middleware/auth';
import hooksMiddleware from './middleware/hooks';
import rootReducer from './reducers';

const logger = createLogger({ collapsed: true });
const { read, write } = reduxLocalstorage('freestone');

const routeMiddleware = routerMiddleware(hashHistory);

// console.log(apiMiddleware);

const middleWares = [
	thunkMiddleware,
	apiMiddleware,
	hooksMiddleware,
	authMiddleware,
	logger,
	write,
	routeMiddleware,
];

const reducers = {
	freestone: rootReducer,
	routing: routerReducer,
};

export function addMiddleware(m) {
	middleWares.push(m);
}

export function addReducer(n, r) {
	reducers[n] = r;
}

export function configureStore(initialState) {
	const currentState = read() || initialState;
	//remove current routing from local storage state, to return to home at refresh if fatal error
	if (currentState && currentState.errors && currentState.errors.filter(e => e.isFatal).length) {
		delete currentState.routing;
		delete currentState.errors;
	}

	const createStoreWithMiddleware = applyMiddleware(
		...middleWares
	)(createStore);

	const store = createStoreWithMiddleware(combineReducers(reducers), currentState);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('./reducers', () => {
			const nextRootReducer = require('./reducers/index');
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
}

export function configureHistory(store) {
	return syncHistoryWithStore(hashHistory, store);
}

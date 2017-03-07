import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import apiMiddleware from 'middleware/api';
import authMiddleware from 'middleware/auth';
import hooksMiddleware from 'middleware/hooks';
import createLogger from 'redux-logger';
import reduxLocalstorage from 'redux-simple-localstorage';
import { routerMiddleware } from 'react-router-redux';
import { hashHistory } from 'react-router';

import rootReducer from '../reducers';

const logger = createLogger({ collapsed: true });
const { read, write } = reduxLocalstorage('freestone');

const routeMiddleware = routerMiddleware(hashHistory);
// console.log(apiMiddleware);

const createStoreWithMiddleware = applyMiddleware(
	thunkMiddleware,
	apiMiddleware,
	hooksMiddleware,
	authMiddleware,
	logger,
    write,
    routeMiddleware
)(createStore);

export default function configureStore(initialState) {
	const currentState = read() || initialState;
	//remove current routing from local storage state, to return to home at refresh if fatal error
	if (currentState && currentState.errors && currentState.errors.filter(e => e.isFatal).length) {
		delete currentState.routing;
		delete currentState.errors;
	}
	const store = createStoreWithMiddleware(rootReducer, currentState);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('../reducers', () => {
			const nextRootReducer = require('../reducers/index');
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
}

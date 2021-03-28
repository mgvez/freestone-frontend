
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { createHashHistory } from 'history';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reduxLocalstorage from 'redux-simple-localstorage';
import queryString from 'query-string';

import apiMiddleware from './middleware/api';
import authMiddleware from './middleware/auth';
import hooksMiddleware from './middleware/hooks';
import rootReducer from './reducers';

export const history = createHashHistory();

const logger = createLogger({ collapsed: true });
const { read, write } = reduxLocalstorage('freestone');

// const routeMiddleware = routerMiddleware(hashHistory);

// console.log(apiMiddleware);

const middleWares = [
	thunkMiddleware,
	apiMiddleware,
	hooksMiddleware,
	authMiddleware,
	logger,
	write,
	// routeMiddleware,
];


const createRootReducer = (hist) => combineReducers({
	router: connectRouter(hist),
	freestone: rootReducer,
});

export function addMiddleware(m) {
	middleWares.push(m);
}

export function configureStore(initialState = {}) {
	//if resetting password, empty everything
	const q = queryString.parse(window.location.search);

	const currentState = (!q.rpk && read()) || initialState;
	//remove current routing from local storage state, to return to home at refresh if fatal error
	if (currentState.errors && currentState.errors.filter(e => e.isFatal).length) {
		delete currentState.errors;
	}

	delete currentState.router;

	if (currentState.freestone) {
		if (currentState.freestone.auth) {
			currentState.freestone.auth.statusText = null;
			currentState.freestone.auth.isRequestPending = false;
			currentState.freestone.auth.isResetRequestSent = false;
		}

		delete currentState.freestone.translations;
		delete currentState.freestone.recordList;
		delete currentState.freestone.recordPreview;
		delete currentState.freestone.save;
		delete currentState.freestone.permissions;

	}

	const store = createStore(
		createRootReducer(history), // root reducer with router state
		currentState,
		compose(
			applyMiddleware(
				routerMiddleware(history), // for dispatching history actions
				...middleWares
			),
		),
	);
	
	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('./reducers', () => {
			store.replaceReducer(createRootReducer(history));
		});
	}

	return store;

	// const createStoreWithMiddleware = applyMiddleware(
	// 	...middleWares
	// )(createStore);

	// const store = createStoreWithMiddleware(combineReducers(reducers), currentState);

	// if (module.hot) {
	// 	// Enable Webpack hot module replacement for reducers
	// 	module.hot.accept('./reducers', () => {
	// 		const nextRootReducer = require('./reducers/index');
	// 		store.replaceReducer(nextRootReducer);
	// 	});
	// }

	// return store;
}

// export function configureHistory(store) {
// 	return syncHistoryWithStore(hashHistory, store);
// }

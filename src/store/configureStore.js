import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import apiMiddleware from 'middleware/api';
import authMiddleware from 'middleware/auth';
import createLogger from 'redux-logger';
import reduxLocalstorage from 'redux-simple-localstorage';
import rootReducer from '../reducers';

const logger = createLogger({ collapsed: true });
const { read, write } = reduxLocalstorage('freestone');

// console.log(apiMiddleware);

const createStoreWithMiddleware = applyMiddleware(
	thunkMiddleware,
	apiMiddleware,
	authMiddleware,
	logger,
    write
)(createStore);

export default function configureStore(initialState) {
	const store = createStoreWithMiddleware(rootReducer, read() || initialState);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('../reducers', () => {
			const nextRootReducer = require('../reducers/index');
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
}

import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/lib/createBrowserHistory';
import { Provider } from 'react-redux';
import { Router, Redirect } from 'react-router';
import configureStore from './store/configureStore';
import routes from './routes';
import { syncReduxAndRouter } from 'redux-simple-router';

import { loginUserSuccess, TOKEN_NAME } from './actions/login';

const store = configureStore();
const history = createHistory();
syncReduxAndRouter(history, store);


const jwt = localStorage.getItem(TOKEN_NAME);
if (jwt) {
	store.dispatch(loginUserSuccess(jwt));
}

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Redirect from="/" to="login" />
			{routes}
		</Router>
	</Provider>,
	document.getElementById('root')
);

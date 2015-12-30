import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/lib/createBrowserHistory';
import { Provider } from 'react-redux';
import { Router, Redirect } from 'react-router';
import configureStore from './store/configureStore';
import routes from './routes';
import { syncReduxAndRouter } from 'redux-simple-router';

import { receiveToken, getJWT } from './actions/auth';

const store = configureStore();
const history = createHistory();
syncReduxAndRouter(history, store);


const jwt = getJWT();
if (jwt) {
	// console.log(jwt);
	receiveToken(jwt, store.dispatch);
}

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Redirect from="/" to="home" />
			{routes}
		</Router>
	</Provider>,
	document.getElementById('root')
);

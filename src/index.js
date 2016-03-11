import React from 'react';
import ReactDOM from 'react-dom';
// import createHistory from 'history/lib/createBrowserHistory';
// import createHistory from 'history/lib/createHashHistory';
import { Provider } from 'react-redux';
import { Router, Redirect, hashHistory } from 'react-router';
import configureStore from './store/configureStore';
import routes from './routes';
import { syncHistoryWithStore } from 'react-router-redux';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Redirect from="/" to="home" />
			{routes}
		</Router>
	</Provider>,
	document.getElementById('root')
);

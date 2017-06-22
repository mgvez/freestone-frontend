import React from 'react';
import ReactDOM from 'react-dom';
// import createHistory from 'history/lib/createBrowserHistory';
// import createHistory from 'history/lib/createHashHistory';
import { Provider } from 'react-redux';
// import { historyApi } from './config';
import { Route, Router, Redirect } from 'react-router';
import { configureHistory, configureStore } from './connection';
import { Freestone } from './components/connected/Freestone';

import routes from './routes';

// <Router onUpdate={() => window.scrollTo(0, 0)}
import { setStore } from 'freestone/api';

const store = configureStore();
const history = configureHistory(store);


setStore(store);

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Redirect from="/" to="home" />
			<Route path="/" component={Freestone}>
				{routes}
			</Route>
		</Router>
	</Provider>,
	document.getElementById('root')
);

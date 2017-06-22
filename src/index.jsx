import React from 'react';
import ReactDOM from 'react-dom';
// import createHistory from 'history/lib/createBrowserHistory';
// import createHistory from 'history/lib/createHashHistory';
import { Provider } from 'react-redux';
// import { historyApi } from './config';
import { Route, Router, Redirect } from 'react-router';
import { appHistory, store } from './appHistory';
import { Freestone } from 'components/connected/Freestone';

import routes from './routes';

// <Router onUpdate={() => window.scrollTo(0, 0)}
import { setStore } from 'freestone/api';
setStore(store);

ReactDOM.render(
	<Provider store={store}>
		<Router history={appHistory}>
			<Redirect from="/" to="home" />
			<Route path="/" component={Freestone}>
				{routes}
			</Route>
		</Router>
	</Provider>,
	document.getElementById('root')
);

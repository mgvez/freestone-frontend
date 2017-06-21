import React from 'react';
import ReactDOM from 'react-dom';

// import createHistory from 'history/lib/createBrowserHistory';
// import createHistory from 'history/lib/createHashHistory';
import { Provider } from 'react-redux';

import { HashRouter as Router, Route, Redirect } from 'react-router-dom';

import { ConnectedRouter } from 'react-router-redux';

import { history, store } from './store';

import routes from './routes';


// <Router onUpdate={() => window.scrollTo(0, 0)}
import { setStore } from './freestone/api';
setStore(store);

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<div>
				<Redirect from="/" to="home" />
				
				{routes}

			</div>
		</Router>
	</Provider>,
	document.getElementById('root')
);

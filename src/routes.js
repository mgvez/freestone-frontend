import React from 'react';
import { Route } from 'react-router';
import { requireAuthentication } from 'components/AuthenticatedComponent';


/* containers */
import { App } from 'containers/App';
import { Home } from 'containers/Home';
import { Login } from 'containers/Login';

export default (
	<Route path="/" component={App}>
		<Route path="login" component={Login}/>
		<Route path="home" component={requireAuthentication(Home)} />
	</Route>
);

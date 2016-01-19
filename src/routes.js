import React from 'react';
import { Route } from 'react-router';
import { requireAuthentication } from 'components/AuthenticatedComponent';


/* containers */
import { App } from 'containers/App';
import { Freestone } from 'containers/Freestone';
import { Home } from 'containers/Home';
import { Login } from 'containers/Login';
import { List } from 'containers/List';

export default (
	<Route path="/" component={App}>
		<Route path="login" component={Login}/>
		<Route path="" component={requireAuthentication(Freestone)}>
			<Route path="home" component={Home}/>
			<Route path="table/:tableName" component={List}/>
		</Route>
	</Route>
);

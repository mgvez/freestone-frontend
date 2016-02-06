import React from 'react';
import { Route } from 'react-router';
import { requireAuthentication } from 'components/AuthenticatedComponent';


/* containers */
import { App } from 'containers/App';
import { Freestone } from 'containers/Freestone';
import { Home } from 'containers/Home';
import { Login } from 'containers/Login';
import { List } from 'containers/List';
import { RootForm } from 'containers/Form/Root';
import { Save } from 'containers/Save/Save';

export default (
	<Route path="/" component={App}>
		<Route path="login" component={Login}/>
		<Route path="" component={requireAuthentication(Freestone)}>
			<Route path="home" component={Home}/>
			<Route path="list/:tableName" component={List}/>
			<Route path="edit/:tableName/:recordId" component={RootForm}/>
			<Route path="save/:tableName/:recordId" component={Save}/>
		</Route>
	</Route>
);

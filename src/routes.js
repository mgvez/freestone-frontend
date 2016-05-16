import React from 'react';
import { Route } from 'react-router';


/* containers */
import { App } from 'components/connected/App';
import { Freestone } from 'components/connected/Freestone';
import { Home } from 'components/connected/Home';
import { Login } from 'components/connected/Login';
import { List } from 'components/connected/List';
import { RootForm } from 'components/connected/Form/Root';
import { Save } from 'components/connected/Save';

export default (
	<Route path="/" component={App}>
		<Route path="login" component={Login}/>
		<Route path="" component={Freestone}>
			<Route path="home" component={Home}/>
			<Route path="list/:tableName(/:page)(/:search)" component={List}/>
			<Route path="edit/:tableName/:recordId" component={RootForm}/>
			<Route path="save/:tableName/:recordId" component={Save}/>
		</Route>
	</Route>
);

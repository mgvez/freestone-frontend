import React from 'react';
import { Route } from 'react-router';


/* containers */
import { App } from 'components/connected/App';
import { Freestone } from 'components/connected/Freestone';
import { Home } from 'components/connected/Home';
import { Login } from 'components/connected/Login';
import { List } from 'components/connected/List';
import { RootForm } from 'components/connected/form/RootForm';
import { Cancel } from 'components/connected/process/Cancel';
import { Module } from 'components/connected/Module';

export default (
	<Route path="/" component={App}>
		<Route path="login" component={Login}/>
		<Route path="" component={Freestone}>
			<Route path="home" component={Home}/>
			<Route path="list/:tableName(/:page)(/:search)" component={List}/>
			<Route path="edit/:tableName/:recordId" component={RootForm}/>
			<Route path="cancel/:tableName/:recordId" component={Cancel}/>
			<Route path="module/:url" component={Module}/>
		</Route>
	</Route>
);

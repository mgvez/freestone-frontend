import React from 'react';
import { Route } from 'react-router';


/* containers */
import { Freestone } from 'components/connected/Freestone';
import { Home } from 'components/connected/Home';
import { List } from 'components/connected/recordList/List';
import { RootForm } from 'components/connected/form/RootForm';
import { Module } from 'components/connected/Module';
import { Page } from 'components/connected/Page';
import { NativeModule } from 'components/connected/nativeModules/NativeModule';

export default (
	<Route path="/" component={Freestone}>
		<Route path="home" component={Home} />
		<Route path="list/:tableName(/:page)(/:search)" component={List} />
		<Route path="edit/:tableName/:recordId" component={RootForm} />
		<Route path="module/:url" component={Module} />
		<Route path="page/:id" component={Page} />
		<Route path="n-module/:name" component={NativeModule} />
	</Route>
);
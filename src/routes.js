import React from 'react';
import { Route } from 'react-router';


/* containers */
import { Home } from './components/connected/Home';
import { List } from './components/connected/recordList/List';
import { RootForm } from './components/connected/form/RootForm';
import { Module } from './components/connected/Module';
import { Page } from './components/connected/Page';
import { NativeModule } from './components/connected/nativeModules/NativeModule';

export default (
	<div>
		<Route path="home" component={Home} />
		<Route path="list/:tableName(/:page)(/:search)" component={List} />
		<Route path="edit/:tableName/:recordId" component={RootForm} />
		<Route path="module/:url" component={Module} />
		<Route path="page/:id" component={Page} />
		<Route path="n-module/:name" component={NativeModule} />
	</div>
);

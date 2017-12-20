import React from 'react';
import { Route } from 'react-router';

/* containers */
import Home from './components/Home';
import List from './containers/recordList/List';
import RootForm from './containers/form/RootForm';
import Module from './containers/Module';
import Page from './containers/Page';
import NativeModule from './containers/nativeModules/NativeModule';

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

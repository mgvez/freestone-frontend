/* eslint-disable */
import React, { Component } from 'react';
import { Route, Switch } from 'react-router';

import Freestone from './containers/Freestone';

/* containers */
import Home from './components/Home';
import List from './containers/recordList/List';
import BatchEdit from './containers/recordList/BatchEdit';
import RootForm from './containers/form/RootForm';
import Module from './containers/Module';
import Page from './containers/Page';
import NativeModule from './containers/nativeModules/NativeModule';

class NoMatch extends Component {
	render() {
		return (
			<div>
				No match yo
			</div>
		);
	}
}

export default (
	<Freestone>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/list/:tableName" exact component={List} />
			<Route path="/batch/:tableName" exact component={BatchEdit} />
			<Route path="/edit/:tableName/:recordId" component={RootForm} />
			<Route path="/module/:url" component={Module} />
			<Route path="/page/:id" component={Page} />
			<Route path="/n-module/:name" component={NativeModule} />
			<Route component={NoMatch} />
		</Switch>
	</Freestone>
);

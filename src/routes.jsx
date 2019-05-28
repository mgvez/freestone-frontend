import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Freestone from './containers/Freestone';

/* containers */
import Home from './components/Home';
import List from './containers/recordList/List';
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
			<Route exact path="/" render={(props) => <Home params={props.match.params} />} />
			<Route path="/list/:tableName/:page?/:search?" render={(props) => <List params={props.match.params} />} />
			<Route path="/edit/:tableName/:recordId" render={(props) => <RootForm key={`${props.match.params.tableName}_${props.match.params.recordId}`} params={props.match.params} />} />
			<Route path="/module/:url" render={(props) => <Module params={props.match.params} />} />
			<Route path="/page/:id" render={(props) => <Page params={props.match.params} />} />
			<Route path="/n-module/:name" render={(props) => <NativeModule params={props.match.params} />} />
			<Route component={NoMatch} />
		</Switch>
	</Freestone>
);

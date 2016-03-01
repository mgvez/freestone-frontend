import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as envActionCreators from 'actions/env';

import 'bootstrap-webpack';
import 'style!scss/style.scss';

import 'style!font-awesome/scss/font-awesome.scss';

@connect(
	state => state,
	dispatch => bindActionCreators(envActionCreators, dispatch)
)
export class App extends Component {
	static propTypes = {
		children: React.PropTypes.any,
		fetchEnv: React.PropTypes.func,
	};

	componentWillMount() {
		this.props.fetchEnv();
	}

	render() {
		console.log('%cRENDER ==========================', 'color: #4C50A9; font-weight: bold');
		return (
			<div id="main-wrapper">
				{this.props.children}
			</div>
		);
	}
}

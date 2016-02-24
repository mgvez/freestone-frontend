import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as authActionCreators from 'actions/auth';
import * as devActionCreators from 'actions/dev';
import * as envActionCreators from 'actions/env';

import 'bootstrap-webpack';

/* global styles for app */
import 'style!./styles/app.scss';

/* application components */
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';

const actionCreators = { ...authActionCreators, ...devActionCreators, ...envActionCreators };


@connect(
	state => state,
	dispatch => bindActionCreators(actionCreators, dispatch)
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
			<section>
				<Header {...this.props} />
				{this.props.children}
				<Footer />
			</section>
		);
	}
}

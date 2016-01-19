import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from 'actions/auth';
import 'bootstrap-webpack';

/* global styles for app */
import 'style!./styles/app.scss';

/* application components */
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';

@connect(
	null,
	dispatch => bindActionCreators(actionCreators, dispatch)
)
export class App extends Component {
	static propTypes = {
		children: React.PropTypes.any,
	};

	render() {
		return (
			<section>
				<Header {...this.props} />
				{this.props.children}
				<Footer />
			</section>
		);
	}
}

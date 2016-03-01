import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as authActionCreators from 'actions/auth';
import * as devActionCreators from 'actions/dev';

const actionCreators = { ...authActionCreators, ...devActionCreators };

/* application components */
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
import { Nav } from 'containers/Nav';

@connect(
	state => {
		return { auth: state.auth, env: state.env };
	},
	dispatch => bindActionCreators(actionCreators, dispatch)
)
export class Freestone extends Component {
	static propTypes = {
		auth: React.PropTypes.object,
		env: React.PropTypes.object,

		unauthorized: React.PropTypes.func,
		children: React.PropTypes.any,
	};
	
	componentWillMount() {
		this.checkAuth();
	}

	componentWillReceiveProps() {
		this.checkAuth();
	}

	checkAuth() {
		// console.log('AUTHENTICATED:: ' + this.props.isAuthenticated);
		if (!this.props.auth.isAuthenticated) {
			this.props.unauthorized();
		}
	}

	render() {
		console.log('%cRender AUTH', 'font-weight: bold');

		if (!this.props.auth.isAuthenticated) {
			return <div>Not permitted</div>;
		}

		// console.log(this.props.errors);
		return (
			<div>
				<Nav />
				<div className="main-content">
					<Header {...this.props} />
					{this.props.children}
					<Footer />
				</div>
			</div>
		);
	}
}

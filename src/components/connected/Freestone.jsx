import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as authActionCreators from 'actions/auth';
import * as devActionCreators from 'actions/dev';
import * as envActionCreators from 'actions/env';
import { clearSchema } from 'actions/schema';

const actionCreators = { ...authActionCreators, ...devActionCreators, ...envActionCreators, clearSchema };

/* application components */
import { SiteHeader } from 'components/connected/SiteHeader';
import { Footer } from 'components/static/Footer';
import { Errors } from 'components/connected/Errors';
import { Nav } from 'components/connected/Nav';
import { LoadedRecords } from 'components/connected/LoadedRecords';
import { Login } from 'components/connected/auth/Login';
import { GoogleAuthenticate } from 'components/connected/auth/GoogleAuthenticate';

import 'style!scss/style.scss';
import 'style!font-awesome/scss/font-awesome.scss';

@connect(
	state => {
		return { 
			auth: state.auth, 
			env: state.env,
		};
	},
	dispatch => bindActionCreators(actionCreators, dispatch)
)
export class Freestone extends Component {
	static propTypes = {
		auth: React.PropTypes.object,
		env: React.PropTypes.object,

		unauthorized: React.PropTypes.func,
		fetchVariable: React.PropTypes.func,
		fetchEnv: React.PropTypes.func,
		children: React.PropTypes.any,
	};

	componentWillMount() {
		this.requireData(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.requireData(nextProps);
	}

	requireData(props) {
		// console.log(props.env);
		if (!props.env.clientPath) this.props.fetchEnv();
	}

	render() {
		// console.log('%cRender Freestone (auth)', 'font-weight: bold');

		if (!this.props.auth.isAuthenticated) {
			return (
				<div>
					<Errors {...this.props} />
					<Login />
					<GoogleAuthenticate />
				</div>
			);
		}

		return (
			<div id="main-wrapper">
				<Nav />
				<div className="main-content">
					<SiteHeader {...this.props} />
					<LoadedRecords />
					{this.props.children}
					<Footer />
					<Errors {...this.props} />
				</div>
				<GoogleAuthenticate />
			</div>
		);
	}
}

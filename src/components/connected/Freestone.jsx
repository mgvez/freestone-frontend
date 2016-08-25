import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as authActionCreators from 'actions/auth';
import * as devActionCreators from 'actions/dev';
import * as envActionCreators from 'actions/env';
import { clearSchema } from 'actions/schema';
import { MAX_TIME_BETWEEN_API_CALLS } from 'freestone/settings';

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
			isAuthenticated: state.auth.isAuthenticated,
			lastRequestTime: state.auth.lastRequestTime,
			env: state.env,
		};
	},
	dispatch => bindActionCreators(actionCreators, dispatch)
)
export class Freestone extends Component {
	static propTypes = {
		isAuthenticated: React.PropTypes.bool,
		lastRequestTime: React.PropTypes.number,
		env: React.PropTypes.object,

		loginUser: React.PropTypes.func,
		fetchVariable: React.PropTypes.func,
		fetchEnv: React.PropTypes.func,
		children: React.PropTypes.any,
	};

	componentWillMount() {
		this.requireData(this.props);

		//at load of app, force an API call to revalidate the JWT if last validation is too old
		const now = Date.now();
		const diff = (now - this.props.lastRequestTime) / 1000;
		if (diff > MAX_TIME_BETWEEN_API_CALLS) this.props.loginUser();
	}

	componentWillReceiveProps(nextProps) {
		this.requireData(nextProps);
	}

	requireData(props) {
		// console.log(props.env);
		//s'assure que l'env est loadé
		if (!props.env.clientPath) this.props.fetchEnv();
	}

	render() {
		// console.log('%cRender Freestone (auth)', 'font-weight: bold');

		if (!this.props.isAuthenticated) {
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

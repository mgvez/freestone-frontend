import React, { Component } from 'react';
import Script from 'react-load-script';

import { MAX_TIME_BETWEEN_API_CALLS } from '../freestone/settings';

/* application components */
import SiteHeader from '../containers/SiteHeader';
import { Footer } from './footer/Footer';
import Errors from '../containers/Errors';
import { Nav } from './menu/Nav';
import { LoadedRecords } from './dashboard/LoadedRecords';
import { Login } from './auth/Login';
import { GoogleAuthenticate } from './auth/GoogleAuthenticate';
import qstrParams from '../utils/qstrParams';

import 'style-loader!../scss/style.scss';
import 'font-awesome/scss/font-awesome.scss';
// import 'style-loader!font-awesome/scss/font-awesome.scss';
// require('font-awesome-webpack-2');

export default class Freestone extends Component {
	static propTypes = {
		isAuthenticated: React.PropTypes.bool,
		lastRequestTime: React.PropTypes.number,
		freestone: React.PropTypes.object,
		jwt: React.PropTypes.string,

		loginUser: React.PropTypes.func,
		fetchVariable: React.PropTypes.func,
		fetchEnv: React.PropTypes.func,
		children: React.PropTypes.any,
	};

	componentWillMount() {

		this.state = {
			gapiready: false,
		};

		this.requireData(this.props);

		//at load of app, force an API call to revalidate the JWT if last validation is too old
		const now = Date.now();
		const diff = (now - this.props.lastRequestTime) / 1000;
		if (diff > MAX_TIME_BETWEEN_API_CALLS) this.props.loginUser();
	}

	componentWillReceiveProps(nextProps) {
		this.requireData(nextProps);
	}

	onGapiReady = () => {
		this.setState({ gapiready: true });
	}
	
	onScriptLoaded = () => {
		// console.log(arguments);
	}
	
	onScriptError = () => {

	}

	requireData(props) {
		// console.log(props.env);
		//s'assure que l'env est loadé
		if (!props.freestone.clientPath) this.props.fetchEnv();

	}

	render() {
		// console.log('%cRender Freestone (auth)', 'font-weight: bold');
		if (!this.props.isAuthenticated) {
			return (
				<div>
					<Errors {...this.props} />
					<Login gapiready={this.state.gapiready} />
					<GoogleAuthenticate onGapiReady={this.onGapiReady} />
				</div>
			);
		}

		//on login, if we want to redirect to public site (i.e. we may use the admin's login for public website access)
		const onLogin = qstrParams('onlogin');
		if (onLogin) {
			// console.log(this.props.env);
			const loc = onLogin === 'home' ? '' : onLogin;
			const root = `//${this.props.freestone.domain}/${loc}?jwt=${this.props.jwt}`;
			window.location = root;
			return null;
		}

		return (
			<div id="main-wrapper">
				<Nav />
				<div className="main-content">
					<SiteHeader />
					<LoadedRecords />
					{this.props.children}
					<Footer />
					<Errors {...this.props} />
				</div>
				<GoogleAuthenticate onGapiReady={this.onGapiReady} />
				{
					this.props.freestone.clientScripts.map((scriptPath, i) => { 
						return <Script key={i} url={scriptPath} onError={this.onScriptError} onLoad={this.onScriptLoaded} />;
					})
				}
			</div>
		);
	}
}

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* actions */
import * as authActionCreators from 'actions/auth';
import { fetchVariable, setVariable } from 'actions/env';

@connect(
	state => {
		return {
			...state.auth,
			apiGoogle: state.envVariables && state.envVariables.api_google,
		};
	},
	dispatch => bindActionCreators({ ...authActionCreators, fetchVariable, setVariable }, dispatch)
)
export class GoogleAuthenticate extends Component {
	static propTypes = {
		children: React.PropTypes.any,
		apiGoogle: React.PropTypes.object,
		scope: React.PropTypes.string,
		isAuthenticated: React.PropTypes.bool,
		cookiePolicy: React.PropTypes.string,

		fetchVariable: React.PropTypes.func,
		loginGoogleAPI: React.PropTypes.func,
	};

	static defaultProps = {
		scope: 'profile email',
		cookiePolicy: 'single_host_origin',
	};

	componentWillMount() {
		// console.log(this.props.apiGoogle);
		this.requireData(this.props);
		this.initGoogleApi();
	}

	componentWillReceiveProps(nextProps) {
		// console.log(this.props.apiGoogle);
		this.requireData(nextProps);
		this.initGoogleApi();
	}

	onIsLogged = (isLogged) => {
		console.log(isLogged);
	}

	onReceiveUser = (user) => {
		//si user pas loggé, l'envoie au backend pour l'authentifier
		if (!this.props.isAuthenticated) {
			// console.log(user);
			const response = user.getAuthResponse();
			const token = response.id_token;
			// console.log(token);
			this.props.loginGoogleAPI(token);
		}
	}

	initGoogleApi() {

		if (this.gapi) return this.gapi;

		if (this.props.apiGoogle && this.props.apiGoogle.clientId) {

			const { clientId } = this.props.apiGoogle;
			// console.log(clientId);
			const { scope, cookiePolicy } = this.props;
			((d, s, id, cb) => {
				const element = d.getElementsByTagName(s)[0];
				const fjs = element;
				let js = element;
				js = d.createElement(s);
				js.id = id;
				js.src = '//apis.google.com/js/platform.js';
				fjs.parentNode.insertBefore(js, fjs);
				js.onload = cb;
			})(document, 'script', 'google-login', () => {
				const params = {
					client_id: clientId,
					cookiepolicy: cookiePolicy,
					// login_hint: loginHint,
					// hosted_domain: hostedDomain,
					scope,
				};
				const gapi = window.gapi;
				gapi.load('auth2', () => {
					const auth2 = gapi.auth2;
					if (!auth2.getAuthInstance()) {
						// console.log('gapi authenticate loaded');
						const GoogleAuth = auth2.init(params);

						GoogleAuth.then(() => {
							// console.log('gapi inited callback');
							if (GoogleAuth.isSignedIn.get()) {
								const user = GoogleAuth.currentUser.get();
								this.onReceiveUser(user);
							}
							GoogleAuth.isSignedIn.listen(this.onIsLogged);
							GoogleAuth.currentUser.listen(this.onReceiveUser);
						});
					}

				});
			});
			this.gapi = true;
			return true;
		}
		return false;
	}

	requireData(nextProps) {
		if (typeof nextProps.apiGoogle === 'undefined') this.props.fetchVariable('api.google');
	}

	render() {
		return <div>{this.props.children}</div>;
	}
}
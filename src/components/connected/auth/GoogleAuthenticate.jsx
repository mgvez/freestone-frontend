import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* actions */
import * as authActionCreators from '../../../actions/auth';
import { fetchVariable } from '../../../actions/env';

@connect(
	state => {
		return {
			...state.auth,
			apiGoogle: state.envVariables && state.envVariables.api_google,
		};
	},
	dispatch => bindActionCreators({ ...authActionCreators, fetchVariable }, dispatch)
)
export class GoogleAuthenticate extends Component {
	static propTypes = {
		children: React.PropTypes.any,
		apiGoogle: React.PropTypes.object,
		scope: React.PropTypes.string,
		isAuthenticated: React.PropTypes.bool,
		cookiePolicy: React.PropTypes.string,
		gapi_ready: React.PropTypes.number,

		fetchVariable: React.PropTypes.func,
		loginGoogleAPI: React.PropTypes.func,
		googleReady: React.PropTypes.func,
	};

	static defaultProps = {
		scope: 'profile email https://www.googleapis.com/auth/analytics.readonly',
		cookiePolicy: 'single_host_origin',
	};

	componentWillMount() {
		// console.log(this.props.apiGoogle);
		this.requireData(this.props);
		this.initGoogleApi(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.requireData(nextProps);
		this.initGoogleApi(nextProps);
	}

	onIsLogged = () => {
		// console.log(isLogged);
	}

	onReceiveUser = (user) => {
		//si user pas loggé, l'envoie au backend pour l'authentifier
		// console.log(user);
		if (!this.props.isAuthenticated) {
			const response = user.getAuthResponse();
			const token_id = response.id_token;
			const token_access = response.access_token;
			// console.log(token);
			this.props.loginGoogleAPI(token_id, token_access);
		}
	}

	initGoogleApi(props) {

		if (this.gapi) return this.gapi;

		if (props.apiGoogle && props.apiGoogle.clientId) {

			const { clientId } = props.apiGoogle;
			// console.log(clientId);
			const { scope, cookiePolicy } = props;
			const params = {
				client_id: clientId,
				cookiepolicy: cookiePolicy,
				// login_hint: loginHint,
				// hosted_domain: hostedDomain,
				scope,
			};
			const gapi = window.gapi;
			if (!gapi) return false;
			gapi.load('auth2', () => {
				
				const auth2 = gapi.auth2;
				if (!auth2.getAuthInstance()) {
					const GoogleAuth = auth2.init(params);

					GoogleAuth.then(() => {
						// console.log(scope);
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

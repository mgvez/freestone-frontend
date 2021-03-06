import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class GoogleAuthenticate extends Component {
	static propTypes = {
		children: PropTypes.any,
		apiGoogle: PropTypes.object,
		scope: PropTypes.string,
		isAuthenticated: PropTypes.bool,
		cookiePolicy: PropTypes.string,
		gapi_ready: PropTypes.number,

		fetchVariable: PropTypes.func,
		loginGoogleAPI: PropTypes.func,
		onGapiReady: PropTypes.func,
	};

	static defaultProps = {
		scope: 'profile email https://www.googleapis.com/auth/analytics.readonly',
		cookiePolicy: 'single_host_origin',
	};

	componentDidMount() {
		// console.log(this.props.apiGoogle);
		this.requireData();
		this.initGoogleApi(this.props);
	}

	componentDidUpdate() {
		// console.log(this.props.isAuthenticated);
		this.requireData();
		this.initGoogleApi();
	}

	onIsLogged = () => {
		// console.log(isLogged);
	}

	onReceiveUser = (user) => {
		//si user pas loggé, l'envoie au backend pour l'authentifier
		// console.log(user);
		// console.log(this.props.isAuthenticated);
		// if (!this.props.isAuthenticated) {
		const response = user.getAuthResponse();
		const token_id = response.id_token;
		const token_access = response.access_token;
		// console.log(token_id);
		this.props.loginGoogleAPI(token_id, token_access);
		// }
	}

	initGoogleApi() {

		if (this.gapi) return this.gapi;

		if (this.props.apiGoogle && this.props.apiGoogle.clientId) {

			const { clientId } = this.props.apiGoogle;
			// console.log(clientId);
			const { scope, cookiePolicy } = this.props;
			const params = {
				client_id: clientId,
				cookiepolicy: cookiePolicy,
				scope,
			};
			const gapi = window.gapi;
			if (!gapi) return false;
			gapi.load('auth2', () => {
				const auth2 = gapi.auth2;
				if (!auth2.getAuthInstance()) {
					
					const GoogleAuth = auth2.init(params);

					GoogleAuth.then(() => {
						if (this.props.onGapiReady) this.props.onGapiReady();
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

	requireData() {
		// console.log(nextProps.apiGoogle);
		if (typeof this.props.apiGoogle === 'undefined') this.props.fetchVariable('api.google');
	}

	render() {
		return <div>{this.props.children}</div>;
	}
}

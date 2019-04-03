import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DocumentMeta from 'react-document-meta';
import GoogleLoginBtn from './GoogleLoginBtn';

const metaData = {
	title: 'Freestone',
	description: 'Freestone Admin',
	meta: {
		charset: 'utf-8',
	},
};

export default class Login extends Component {
	static propTypes = {
		location: PropTypes.object,
		apiGoogle: PropTypes.object,
		statusText: PropTypes.string,
		jwt: PropTypes.string,
		username: PropTypes.string,
		isAuthenticating: PropTypes.bool,
		isInstalled: PropTypes.bool,
		gapiready: PropTypes.bool,

		loginUser: PropTypes.func,
		fetchVariable: PropTypes.func,
		setVariable: PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
		};
	}

	componentDidMount() {
		this.props.setVariable('isInstalled', undefined);
		this.requireData(this.props);
		// console.log(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.requireData(nextProps);
	}

	requireData(nextProps) {
		// console.log(nextProps);
		if (undefined === nextProps.isInstalled) {
			this.props.fetchVariable('isInstalled');
		}
		if (typeof nextProps.apiGoogle === 'undefined') this.props.fetchVariable('api.google');
	}

	login = (e) => {
		e.preventDefault();
		const username = this._username.value;
		const password = this._password.value;
		const remember = this._remember.checked;
		// console.log(username, password, remember);
		this.props.loginUser(username, password, remember, this.props.isInstalled === false);
	};

	render() {

		const msgs = {
			text: 'Please enter your credentials',
			action: 'Submit',
		};

		//si pas installé, on met des messages différents
		if (this.props.isInstalled === false) {
			msgs.text = 'Welcome to Freestone! Please choose a username and password in order to install Freestone.';
			msgs.action = 'Install';
		}

		let googleLoginBtn = null;
		if (this.props.apiGoogle && this.props.apiGoogle.clientId && this.props.gapiready) {
			googleLoginBtn = <GoogleLoginBtn cssClass="button-round-danger-fw" />;
		}

		// <iframe src="dummy.html" name="dummy" style={{ display: 'none' }}></iframe>
		return (
			<section>
				<DocumentMeta {...metaData} />
				<div className="freestone-logo"></div>
				<div className="login-zone">
					<div className="container">
						<div className="row">
							<div className="col-md-6 col-lg-6 col-md-offset-3 col-lg-offset-3">
								<div className="col-md-6 col-md-offset-3">
									{this.props.statusText ? <div className="alert alert-info">{this.props.statusText}</div> : msgs.text}
									<form role="form" onSubmit={this.login}>
										<div className="form-group">
											<input
												type="text"
												className="form-control input-lg"
												placeholder="Username"
												name="freestoneuser"
												ref={el => this._username = el}
												defaultValue={this.state.username}
											/>
										</div>
										<div className="form-group">
											<input
												type="password"
												className="form-control input-lg"
												placeholder="Password"
												name="freestonepass"
												ref={el => this._password = el}
												defaultValue={this.state.password}
											/>
										</div>
										<div className="form-group">
											<div className="checkbox-container">
												<input type="checkbox" id="remember" ref={el => this._remember = el} />
												<label htmlFor="remember">Remember me?</label>
											</div>
										</div>
										<div className="form-group">
											<button type="submit" className="button-round-fw" disabled={this.props.isAuthenticating}>{msgs.action}</button>
										</div>
									</form>
									{googleLoginBtn}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

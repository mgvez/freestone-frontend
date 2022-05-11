import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import DocumentMeta from 'react-document-meta';
import GlobalStyles from '../../styles/GlobalStyles';
import GoogleLoginBtn from './GoogleLoginBtn';
import { Button, FlatTopButton } from '../../styles/Button';
import { Input, CheckboxContainer } from '../../styles/Input';
import colors from '../../styles/Colors';
import { GridContainer, GridItem } from '../../styles/Grid';

const metaData = {
	title: 'Freestone',
	description: 'Freestone Admin',
	meta: {
		charset: 'utf-8',
	},
};

const Logo = styled.div`
	width: 100%;
	height: 400px;
	max-height: 66vh;
	background: ${colors.accentSecondary} url(./assets/img/freestone-logo.png) center center no-repeat;
	background-size: auto 295px;
`;

const LoginZone = styled.div`
	background: ${colors.backgroundMain};
	padding: 60px;

	form {
		margin-top: 20px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.btns {
			margin-top: 20px;
			display: flex;
			justify-content: space-between;
		}

		.checkbox-container {
			align-self: flex-start;
		}
	}
`;
export default class Login extends Component {
	static propTypes = {
		location: PropTypes.object,
		apiGoogle: PropTypes.object,
		statusText: PropTypes.string,
		resetPasswordKey: PropTypes.string,
		jwt: PropTypes.string,
		username: PropTypes.string,
		realName: PropTypes.string,
		isRequestPending: PropTypes.bool,
		isResetRequestSent: PropTypes.bool,
		isResetKeyValid: PropTypes.bool,
		isInstalled: PropTypes.bool,
		gapiready: PropTypes.bool,
		ssoAdminURL: PropTypes.string,
		siteName: PropTypes.string,
		clientPath: PropTypes.string,

		loginUser: PropTypes.func,
		fetchVariable: PropTypes.func,
		setVariable: PropTypes.func,
		requestReset: PropTypes.func,
		clearStatus: PropTypes.func,
		resetPassword: PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.state = {
			isShowResetForm: false,
			username: '',
			password: '',
		};
	}

	componentDidMount() {
		this.props.setVariable('isInstalled', undefined);
		this.requireData();
		// console.log(this.props);
	}

	componentDidUpdate() {
		this.requireData();
	}

	requireData() {

		if (undefined === this.props.isInstalled) {
			this.props.fetchVariable('isInstalled');
		}
		if (typeof this.props.apiGoogle === 'undefined') this.props.fetchVariable('api.google');
		//if we are in the process of requesting a password change, we need to get user's info
		if (this.props.isResetKeyValid && this.props.resetPasswordKey && !this.props.realName) {
			this.props.resetPassword(this.props.resetPasswordKey);
		}
	}
	
	toggleReset = () => {
		this.setState(state => {
			return {
				...state,
				isShowResetForm: !state.isShowResetForm,
			};
		});
		this.props.clearStatus();
	}

	sendResetRequest = (e) => {
		e.preventDefault();
		const email = this._email.value;
		this.props.requestReset(email);
	}

	sendReset = (e) => {
		e.preventDefault();
		const newPass = this._newpassword.value;
		this.props.resetPassword(this.props.resetPasswordKey, newPass);
	}

	login = (e) => {
		e.preventDefault();
		const username = this._username.value;
		const password = this._password.value;
		const remember = this._remember.checked;
		const shouldInstall = this.props.isInstalled === false;
		const queryString = (new URL(window.location.href)).searchParams;
		const siteName = queryString.get('site_name');
		this.props.loginUser(username, password, remember, shouldInstall, siteName);
	};

	render() {

		const msgs = {
			text: 'Please enter your credentials',
			action: 'Submit',
		};

		const port = window.location.port ? `:${window.location.port}` : '';
		const redirectUrl = encodeURIComponent(`${this.props.clientPath.replace(/\/$/, '')}${port}/admin`);

		const opacityStyles = { opacity: this.props.isRequestPending ? '0.5' : '1' };

		//si pas installé, on met des messages différents
		if (this.props.isInstalled === false) {
			msgs.text = 'Welcome to Freestone! Please choose a username and password in order to install Freestone.';
			msgs.action = 'Install';
		}
		
		let loginForm = null;

		if (this.props.resetPasswordKey && this.props.isResetKeyValid) {
			msgs.text = 'Please enter your new password.';
			if (this.props.realName) {
				msgs.text = `Hello ${this.props.realName}! ${msgs.text}`;
			}

			loginForm = (<form role="form" onSubmit={this.sendReset} style={opacityStyles}>
				<Input
					type="password"
					className=" input-lg"
					placeholder="New password"
					name="freestonepassword"
					ref={el => this._newpassword = el}
				/>
				<div className="btns">
					<Button type="submit" round="true" mediumwidth="true" disabled={this.props.isRequestPending}>{msgs.action}</Button>
				</div>
			</form>);

		} else if (this.state.isShowResetForm) {
			msgs.text = 'Please enter your email to request a password change.';
			if (!this.props.isResetRequestSent) {
				loginForm = (<form role="form" onSubmit={this.sendResetRequest}>
					<Input
						type="text"
						className=" input-lg"
						placeholder="Email"
						name="email"
						ref={el => this._email = el}
					/>
					<div className="btns">
						<Button type="submit" round="true" disabled={this.props.isRequestPending}>Request password reset</Button>
						<Button round="true" info="true" faded="true" onClick={this.toggleReset}>Cancel</Button>
					</div>
				</form>);
			}

		} else {
			let googleLoginBtn = null;
			if (this.props.apiGoogle && this.props.apiGoogle.clientId && this.props.gapiready) {
				googleLoginBtn = <GoogleLoginBtn />;
			}
			loginForm = (<form role="form" onSubmit={this.login} style={opacityStyles}>
				<Input
					type="text"
					className=" input-lg"
					placeholder="Username"
					name="freestoneuser"
					ref={el => this._username = el}
					defaultValue={this.state.username}
				/>
				<Input
					type="password"
					className=" input-lg"
					placeholder="Password"
					name="freestonepass"
					ref={el => this._password = el}
					defaultValue={this.state.password}
				/>
				<CheckboxContainer startAlign>
					<input type="checkbox" id="remember" ref={el => this._remember = el} />
					<label htmlFor="remember">Remember me?</label>
					<div className="checkmark"></div>
				</CheckboxContainer>
				<div className="btns">
					<Button type="submit" round="true" mediumwidth="true" disabled={this.props.isRequestPending}>{msgs.action}</Button>
					{googleLoginBtn}
					<Button round="true" info="true" faded="true" onClick={this.toggleReset}>Forgot password?</Button>
				</div>

				{
					this.props.ssoAdminURL && (
						<div className="btns">
							<FlatTopButton href={`${this.props.ssoAdminURL}/?site_name=${this.props.siteName}&redirect_url=${redirectUrl}`}>Log in with SSO</FlatTopButton>
						</div>
					)
				}
			</form>);
		}

		// <iframe src="dummy.html" name="dummy" style={{ display: 'none' }}></iframe>
		return (
			<section>
				<DocumentMeta {...metaData} />
				<GlobalStyles />
				<Logo />
				<LoginZone>
					<GridContainer>
						<GridItem columns="4" offset="5">
							{this.props.statusText ? <div className="alert alert-info">{this.props.statusText}</div> : msgs.text}
							{loginForm}
						</GridItem>
					</GridContainer>
				</LoginZone>
			</section>
		);
	}
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import DocumentMeta from 'react-document-meta';
import GlobalStyles from '../../styles/GlobalStyles';
import GoogleLoginBtn from './GoogleLoginBtn';
import { Button } from '../../styles/Button';
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
	background: ${colors.accentSecondary} url(../assets/img/freestone-logo.png) center center no-repeat;
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
			installing: false,
			username: '',
			password: '',
		};
	}

	componentDidMount() {
		this.props.setVariable('isInstalled', undefined);
		this.requireData(this.props);
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
	}

	login = (e) => {
		e.preventDefault();
		const username = this._username.value;
		const password = this._password.value;
		const remember = this._remember.checked;
		// console.log(username, password, remember);
		if (!this.props.isInstalled) {
			this.setState({
				installing: true,
			});
		}
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
		
		let loginForm = null;
		if (!this.state.installing) {
			let googleLoginBtn = null;
			if (this.props.apiGoogle && this.props.apiGoogle.clientId && this.props.gapiready) {
				googleLoginBtn = <GoogleLoginBtn />;
			}
			loginForm = (<form role="form" onSubmit={this.login}>
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
					<Button type="submit" round mediumwidth disabled={this.props.isAuthenticating}>{msgs.action}</Button>
					{googleLoginBtn}
				</div>
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

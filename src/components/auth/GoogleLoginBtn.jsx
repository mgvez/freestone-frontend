import React, { Component } from 'react';
import PropTypes from 'prop-types';
//anthonyjgrove/react-google-login
import { Button } from '../../styles/Button';

export default class GoogleLoginBtn extends Component {
	static propTypes = {
		buttonText: PropTypes.string,
		children: PropTypes.node,
	};

	static defaultProps = {
		buttonText: 'Login with Google',
	};

	onSignIn = () => {
		const auth2 = window.gapi && window.gapi.auth2 && window.gapi.auth2.getAuthInstance();
		if (auth2) auth2.signIn();
	}

	render() {
		if (!window.gapi || !window.gapi.auth2) return null;
		
		const { buttonText, children } = this.props;
		return (
			<Button
				round
				lighter
				onClick={this.onSignIn}
			>
				<i className="fa fa-google"></i>
				{children || buttonText}
			</Button>
		);
	}
}

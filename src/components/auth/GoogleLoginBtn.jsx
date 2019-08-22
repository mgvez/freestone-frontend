import React, { Component } from 'react';
import PropTypes from 'prop-types';
//anthonyjgrove/react-google-login
import { Button } from '../../styles/Button';
import { Icon } from '../../styles/Icon';

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
				round="true"
				lighter="true"
				onClick={this.onSignIn}
			>
				<Icon type="fab" icon="google" />
				{children || buttonText}
			</Button>
		);
	}
}

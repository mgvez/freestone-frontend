import React, { PropTypes, Component } from 'react';
//anthonyjgrove/react-google-login

export default class GoogleLoginBtn extends Component {
	static propTypes = {
		buttonText: PropTypes.string,
		cssClass: PropTypes.string,
		children: React.PropTypes.node,
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
		const style = {
			display: 'inline-block',
			background: '#d14836',
			color: '#fff',
			width: 190,
			paddingTop: 10,
			paddingBottom: 10,
			borderRadius: 2,
			border: '1px solid transparent',
			fontSize: 16,
			fontWeight: 'bold',
			fontFamily: 'Roboto',
		};
		const { cssClass, buttonText, children } = this.props;
		return (
			<button
				className={cssClass}
				onClick={this.onSignIn}
				style={cssClass ? {} : style}
			>
				{children || buttonText}
			</button>
		);
	}
}

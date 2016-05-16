import React, { Component } from 'react';

export class LoginForm extends Component {
	static propTypes = {
		location: React.PropTypes.object,
		statusText: React.PropTypes.string,
		jwt: React.PropTypes.string,
		username: React.PropTypes.string,
		isAuthenticating: React.PropTypes.bool,
		loginUser: React.PropTypes.func,
	};

	constructor(props) {
		super(props);
		const redirectRoute = this.props.location.query.next || '/home';
		this.state = {
			username: 'mvezina',
			password: 'aaa', //'aaa',wLT9GOCG62
			redirectTo: redirectRoute,
		};
	}

	login = (e) => {
		e.preventDefault();
		const username = this.refs.username.value;
		const password = this.refs.password.value;
		// console.log(username, password);
		// console.log(this.state.redirectTo);
		this.props.loginUser(username, password, this.state.redirectTo);
	};

	render() {
		// console.log(this.props);
		return (
			<div className="col-xs-12 col-md-6 col-md-offset-3">
				<h3>Log in</h3>
				<p>JWT id {this.props.jwt}</p>
				{this.props.statusText ? <div className="alert alert-info">{this.props.statusText}</div> : ''}
				<form role="form">
					<div className="form-group">
						<input type="text"
							className="form-control input-lg"
							placeholder="Username"
							ref="username"
							defaultValue={this.state.username}
						/>
					</div>
					<div className="form-group">
						<input type="password"
							className="form-control input-lg"
							placeholder="Password"
							ref="password"
							defaultValue={this.state.password}
						/>
					</div>
					<button type="submit"
						className="btn btn-lg"
						disabled={this.props.isAuthenticating}
						onClick={this.login}
					>
						Submit
					</button>
				</form>
			</div>
		);
	}
}


export default LoginForm;

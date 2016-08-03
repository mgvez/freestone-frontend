import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import DocumentMeta from 'react-document-meta';

/* actions */
import * as actionCreators from 'actions/auth';

const metaData = {
	title: 'Freestone',
	description: 'Freestone Admin',
	meta: {
		charset: 'utf-8',
	},
};

@connect(
	state => state.auth,
	dispatch => bindActionCreators(actionCreators, dispatch)
)
export class Login extends Component {
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
		this.state = {
			username: 'mvezina',
			password: 'aaa', //'aaa',wLT9GOCG62
		};
	}
	
	login = (e) => {
		e.preventDefault();
		const username = this._username.value;
		const password = this._password.value;
		// console.log(username, password);
		this.props.loginUser(username, password);
	};

	render() {
		return (
			<section>
				<DocumentMeta {...metaData} />
				<div className="login-header">
					<a className="logo-grange" href="http://la-grange.ca"></a>
					<a className="help" href="#"><i className="fa fa-question"></i></a>
				</div>
				<div className="freestone-logo"></div>
				<div className="login-zone">
					<div className="container">
						<div className="row">
							<div className="col-md-6 col-lg-6 col-md-offset-3 col-lg-offset-3">
								<div className="col-md-6 col-md-offset-3">
									{this.props.statusText ? <div className="alert alert-info">{this.props.statusText}</div> : ''}
									<form role="form">
										<div className="form-group">
											<input
												type="text"
												className="form-control input-lg"
												placeholder="Username"
												ref={el => this._username = el}
												defaultValue={this.state.username}
											/>
										</div>
										<div className="form-group">
											<input
												type="password"
												className="form-control input-lg"
												placeholder="Password"
												ref={el => this._password = el}
												defaultValue={this.state.password}
											/>
										</div>
										<div className="form-group">
											<div className="checkbox-container">
												<input type="checkbox" id="remember" />
												<label htmlFor="remember">Remember me?</label>
											</div>
										</div>
										<div className="form-group">
											<button type="submit" className="button-round-fw" disabled={this.props.isAuthenticating} onClick={this.login}>Log in</button>
											<button className="button-round-warn-fw">Forgot your password?</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

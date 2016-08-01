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
				<div className="container">
					<div className="row">
						<div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-md-offset-3 col-lg-offset-3">
							<h1>
								Please login
							</h1>
							<div className="col-xs-12 col-md-6 col-md-offset-3">
								<h3>Log in</h3>
								<p>JWT id {this.props.jwt}</p>
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
									<button
										type="submit"
										className="btn btn-lg"
										disabled={this.props.isAuthenticating}
										onClick={this.login}
									>
										Submit
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

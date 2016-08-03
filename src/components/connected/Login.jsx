import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import DocumentMeta from 'react-document-meta';

/* actions */
import * as authActionCreators from 'actions/auth';
import { fetchVariable, setVariable } from 'actions/env';


const metaData = {
	title: 'Freestone',
	description: 'Freestone Admin',
	meta: {
		charset: 'utf-8',
	},
};

@connect(
	state => {
		return {
			...state.auth,
			isInstalled: state.envVariables && state.envVariables.isInstalled,
		};
	},
	dispatch => bindActionCreators({ ...authActionCreators, fetchVariable, setVariable }, dispatch)
)
export class Login extends Component {
	static propTypes = {
		location: React.PropTypes.object,
		statusText: React.PropTypes.string,
		jwt: React.PropTypes.string,
		username: React.PropTypes.string,
		isAuthenticating: React.PropTypes.bool,
		isInstalled: React.PropTypes.bool,

		loginUser: React.PropTypes.func,
		fetchVariable: React.PropTypes.func,
		setVariable: React.PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.state = {
			username: 'mvezina',
			password: 'aaa', //'aaa',wLT9GOCG62
		};
	}

	componentWillMount() {
		this.props.setVariable('isInstalled', undefined);
		this.requireData(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.requireData(nextProps);
	}

	requireData(nextProps) {
		// console.log(nextProps);
		if (undefined === nextProps.isInstalled) {
			this.props.fetchVariable('isInstalled');
		}
	}
	
	login = (e) => {
		e.preventDefault();
		const username = this._username.value;
		const password = this._password.value;
		// console.log(username, password);
		this.props.loginUser(username, password, this.props.isInstalled === false);
	};

	render() {

		const msgs = {
			title: 'Please log in',
			text: 'Please enter your credentials',
			action: 'Submit',
		};

		//si pas installé, on met des messages différents
		if (this.props.isInstalled === false) {
			msgs.title = 'Welcome to Freestone!';
			msgs.text = 'Please choose a username and password in order to install Freestone.';
			msgs.action = 'Install';
		}

		return (
			<section>
				<DocumentMeta {...metaData} />
				<div className="container">
					<div className="row">
						<div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-md-offset-3 col-lg-offset-3">
							<h1>
								{msgs.title}
							</h1>
							{msgs.text}
							<div className="col-xs-12 col-md-6 col-md-offset-3">
								
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
										{msgs.action}
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

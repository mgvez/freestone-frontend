import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import DocumentMeta from 'react-document-meta';

import { LoginForm } from 'components/LoginForm';

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
	constructor(props) {
		super(props);
	}

	render() {
		// console.log(this.props);
		return (
			<section>
				<DocumentMeta {...metaData} />
				<div className="container">
					<div className="row">
						<div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-md-offset-3 col-lg-offset-3">
							<h1>
								Please login
							</h1>
							<LoginForm {...this.props} />
						</div>
					</div>
				</div>
			</section>
		);
	}
}

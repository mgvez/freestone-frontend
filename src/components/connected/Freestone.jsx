import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as authActionCreators from 'actions/auth';
import * as devActionCreators from 'actions/dev';

const actionCreators = { ...authActionCreators, ...devActionCreators };

/* application components */
import { Header } from 'components/unconnected/Header';
import { Footer } from 'components/unconnected/Footer';
import { Errors } from 'components/unconnected/Errors';
import { Nav } from 'components/connected/Nav';
import { TestReselect } from 'components/connected/TestReselect';

const idA = { tableId: 1, tableName: 'tableA' };
const idB = { tableId: 2, tableName: 'tableB' };
const idC = { tableId: 3, tableName: 'tableC' };

let i = 0;
@connect(
	state => {
		return { auth: state.auth, env: state.env, errors: state.errors };
	},
	dispatch => bindActionCreators(actionCreators, dispatch)
)
export class Freestone extends Component {
	static propTypes = {
		auth: React.PropTypes.object,
		env: React.PropTypes.object,

		unauthorized: React.PropTypes.func,
		children: React.PropTypes.any,
	};
	
	componentWillMount() {
		this.checkAuth();
	}

	componentWillReceiveProps() {
		this.checkAuth();
	}

	checkAuth() {
		i++;
		if (i > 10) return false;
		// console.log('AUTHENTICATED:: ' + this.props.isAuthenticated);
		if (!this.props.auth.isAuthenticated) {
			this.props.unauthorized();
		}
	}

	render() {
		// console.log('%cRender Freestone (auth)', 'font-weight: bold');

		if (!this.props.auth.isAuthenticated) {
			return <div>Not permitted</div>;
		}

		return (
			<div>
				<Nav />
				<div className="main-content">
					<Header {...this.props} />
					<TestReselect params={idA} />
					<TestReselect params={idB} />
					<TestReselect params={idC} />
					<Errors {...this.props} />
					{this.props.children}
					<Footer />
				</div>
			</div>
		);
	}
}

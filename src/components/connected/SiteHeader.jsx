import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { clearData, startPerf, stopPerf } from '../../actions/dev';
import { clearErrors } from '../../actions/errors';
import { logout } from '../../actions/auth';
import { clearSchema } from '../../actions/schema';

import { GOD_USER_GROUP } from '../../freestone/schemaProps';

import { HomeButton } from './widgets/HomeButton';
import { NavToggler } from './widgets/NavToggler';
import { LoadedRecordsToggler } from './widgets/LoadedRecordsToggler';

const actionCreators = { clearErrors, clearData, startPerf, stopPerf, clearSchema, logout };

@connect(
	state => {
		// console.log(state.freestone.auth.usergroup, GOD_USER_GROUP);
		return {
			isGod: state.freestone.auth.usergroup === GOD_USER_GROUP,
		};
	},
	dispatch => bindActionCreators(actionCreators, dispatch)
)
export class SiteHeader extends Component {
	static propTypes = {
		isGod: React.PropTypes.bool,

		logout: React.PropTypes.func,
		clearErrors: React.PropTypes.func,
		clearData: React.PropTypes.func,
		startPerf: React.PropTypes.func,
		stopPerf: React.PropTypes.func,
		clearSchema: React.PropTypes.func,
	};

	// hideHeader() {
	// 	const opacity = 1 - (window.pageYOffset / 200).toFixed(1);
	// 	this.refs.header.style.opacity = opacity;
	// }


	render() {
		// console.log(this.props);
		const debug = this.props.isGod || window.IS_DEV ? (<div className="debug-fcn">
			<button className="button-debug-round-small" onClick={this.props.clearSchema}>
				Clear schema
			</button>
			<button className="button-debug-round-small" onClick={this.props.clearData}>
				Clear all data
			</button>
			<button className="button-debug-round-small" onClick={this.props.clearErrors}>
				Clear errors
			</button>
			<button className="button-debug-round-small" onClick={this.props.startPerf}>
				Start perf
			</button>
			<button className="button-debug-round-small" onClick={this.props.stopPerf}>
				Stop perf
			</button>
		</div>) : null;

		return (
			<header id="main-header" ref="header">

				<NavToggler />

				<div className="logout">
					<HomeButton />
					<a onClick={this.props.logout}>
						<i className="fa fa-sign-out"></i> Logout
					</a>
				</div>

				<LoadedRecordsToggler />

				{debug}
			</header>
		);
	}
}

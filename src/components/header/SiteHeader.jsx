import React, { Component } from 'react';

import HomeButton from '../widgets/HomeButton';
import { NavToggler } from '../widgets/NavToggler';
import { LoadedRecordsToggler } from '../widgets/LoadedRecordsToggler';

export default class SiteHeader extends Component {
	static propTypes = {
		isGod: React.PropTypes.bool,

		logout: React.PropTypes.func,
		clearErrors: React.PropTypes.func,
		clearData: React.PropTypes.func,
		startPerf: React.PropTypes.func,
		stopPerf: React.PropTypes.func,
		clearSchema: React.PropTypes.func,
	};

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

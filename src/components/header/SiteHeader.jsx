import React, { Component } from 'react';
import PropTypes from 'prop-types';

import HomeButton from '../widgets/HomeButton';
import NavToggler from '../../containers/widgets/NavToggler';
import LoadedRecordsToggler from '../../containers/widgets/LoadedRecordsToggler';

export default class SiteHeader extends Component {
	static propTypes = {
		isGod: PropTypes.bool,
		isLiveEnv: PropTypes.bool,

		logout: PropTypes.func,
		clearErrors: PropTypes.func,
		clearData: PropTypes.func,
		startPerf: PropTypes.func,
		stopPerf: PropTypes.func,
		clearSchema: PropTypes.func,
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
			
		</div>) : null;

		// <button className="button-debug-round-small" onClick={this.props.clearErrors}>
		// Clear errors
		// </button>
		// <button className="button-debug-round-small" onClick={this.props.startPerf}>
		// Start perf
		// </button>
		// <button className="button-debug-round-small" onClick={this.props.stopPerf}>
		// Stop perf
		// </button>

		const liveWarning = this.props.isLiveEnv ? (<div className="prod-warning">
			PRODUCTION ENVIRONMENT
		</div>) : null;

		return (
			<header id="main-header" ref="header">

				<div>
					<NavToggler />
					{debug}
				</div>

				{liveWarning}

				<div>
					<div className="logout">
						<HomeButton />
						<a onClick={this.props.logout}>
							<i className="fa fa-sign-out"></i> Logout
						</a>
					</div>

					<LoadedRecordsToggler />
				</div>

			</header>
		);
	}
}

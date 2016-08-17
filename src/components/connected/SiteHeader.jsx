import React, { Component } from 'react';

import { HomeButton } from 'components/connected/widgets/HomeButton';
import { NavToggler } from 'components/connected/widgets/NavToggler';
import { LoadedRecordsToggler } from 'components/connected/widgets/LoadedRecordsToggler';

export class SiteHeader extends Component {
	static propTypes = {
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

				<div className="fcn">
					<button className="btn btn-xs" onClick={this.props.clearSchema}>
						Clear schema
					</button>
					<button className="btn btn-xs" onClick={this.props.clearData}>
						Clear all data
					</button>
					<button className="btn btn-xs" onClick={this.props.clearErrors}>
						Clear errors
					</button>
					<button className="btn btn-xs" onClick={this.props.startPerf}>
						Start perf
					</button>
					<button className="btn btn-xs" onClick={this.props.stopPerf}>
						Stop perf
					</button>
				</div>
			</header>
		);
	}
}

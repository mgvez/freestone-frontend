import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as siteHeaderActionCreators from 'actions/siteHeader';
import { siteHeaderSelector } from 'selectors/siteHeader';

@connect(
	siteHeaderSelector,
	dispatch => bindActionCreators(siteHeaderActionCreators, dispatch)
)
export class SiteHeader extends Component {
	static propTypes = {
		toggleNavVisibility: React.PropTypes.func,
		toggleLoadedRecords: React.PropTypes.func,
		logout: React.PropTypes.func,
		clearErrors: React.PropTypes.func,
		clearData: React.PropTypes.func,
		startPerf: React.PropTypes.func,
		stopPerf: React.PropTypes.func,
		clearSchema: React.PropTypes.func,

		env: React.PropTypes.object,
		nav_visibility: React.PropTypes.bool,
		loaded_records_visibility: React.PropTypes.bool,
	};

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		// window.addEventListener('scroll', this.hideHeader);
	}

	componentWillUnmount() {
		// window.removeEventListener('scroll', this.hideHeader);
	}

	// hideHeader() {
	// 	const opacity = 1 - (window.pageYOffset / 200).toFixed(1);
	// 	this.refs.header.style.opacity = opacity;
	// }

	navToggler = () => {
		const visibility = !this.props.nav_visibility;
		this.props.toggleNavVisibility(visibility);
	};

	loadedRecordsToggler = () => {
		const isFirstTime = this.props.loaded_records_visibility === undefined;
		const visibility = isFirstTime ? true : !this.props.loaded_records_visibility;

		this.props.toggleLoadedRecords(visibility);
	};

	render() {
		// console.log(this.props.env);
		return (
			<header id="main-header" ref="header">
				<div className="nav-toggler" onClick={this.navToggler}>Toggle moé la nav</div>
				<div className="loaded-records-toggler" onClick={this.loadedRecordsToggler}>Toggle loaded records</div>
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
				<div className="logout">
					<a onClick={this.props.logout}>
						<i className="fa fa-sign-out"></i> Logout
					</a>
				</div>
			</header>
		);
	}
}

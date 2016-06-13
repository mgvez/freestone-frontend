import React, { Component } from 'react';
import { Link } from 'react-router';


export class SiteHeader extends Component {
	static propTypes = {
		logout: React.PropTypes.func,
		clearErrors: React.PropTypes.func,
		clearData: React.PropTypes.func,
		startPerf: React.PropTypes.func,
		stopPerf: React.PropTypes.func,
		clearSchema: React.PropTypes.func,
		env: React.PropTypes.object,
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

	render() {
		// console.log(this.props.env);
		return (
			<header id="main-header" ref="header">
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

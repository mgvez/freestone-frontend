import React, { Component } from 'react';
import { Link } from 'react-router';

export class NativeModule extends Component {
	static propTypes = {
		label: React.PropTypes.string,
		component: React.PropTypes.string,
		id: React.PropTypes.number,
	};

	render() {
		return (
			<li className="nav-item">
				<Link to={`/n-module/${this.props.component}`} activeClassName="active" className="module">{this.props.label}</Link>
			</li>
		);
	}
}
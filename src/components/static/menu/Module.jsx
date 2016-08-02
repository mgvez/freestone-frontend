import React, { Component } from 'react';
import { Link } from 'react-router';

export class Module extends Component {
	static propTypes = {
		label: React.PropTypes.string,
		url: React.PropTypes.string,
		id: React.PropTypes.number,
	};

	render() {
		return (
			<li className="nav-item">
				<Link to={`/module/${this.props.url}`} activeClassName="active" className="module">{this.props.label}</Link>
			</li>
		);
	}
}

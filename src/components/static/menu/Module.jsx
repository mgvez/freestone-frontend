import React, { Component } from 'react';
import { Link } from 'react-router';

export class Module extends Component {
	static propTypes = {
		label: React.PropTypes.string,
		url: React.PropTypes.string,
		id: React.PropTypes.number,
		className: React.PropTypes.string,
	};

	render() {
		return (
			<Link to={`/module/${this.props.url}`} activeClassName="active" className={`${this.props.className} module`}>{this.props.label}</Link>
		);
	}
}

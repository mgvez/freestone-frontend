import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export class Module extends Component {
	static propTypes = {
		label: React.PropTypes.string,
		url: React.PropTypes.string,
		id: React.PropTypes.number,
		className: React.PropTypes.string,
	};

	render() {
		return (
			<NavLink to={`/module/${this.props.url}`} activeClassName="active" className={`${this.props.className} module`}>{this.props.label}</NavLink>
		);
	}
}

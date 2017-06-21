import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export class NativeModule extends Component {
	static propTypes = {
		label: React.PropTypes.string,
		url: React.PropTypes.string,
		id: React.PropTypes.number,
		className: React.PropTypes.string,
	};

	render() {
		return (
			<NavLink to={`/n-module/${this.props.url}`} activeClassName="active" className={`${this.props.className} module`}>{this.props.label}</NavLink>
		);
	}
}

import React, { Component } from 'react';
import { Link } from 'react-router';

export default class NativeModule extends Component {
	static propTypes = {
		label: React.PropTypes.string,
		url: React.PropTypes.string,
		id: React.PropTypes.number,
		className: React.PropTypes.string,
	};

	render() {
		return (
			<Link to={`/n-module/${this.props.url}`} activeClassName="active" className={`${this.props.className} module`}>{this.props.label}</Link>
		);
	}
}

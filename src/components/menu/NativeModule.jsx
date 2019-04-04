import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export default class NativeModule extends Component {
	static propTypes = {
		label: PropTypes.string,
		url: PropTypes.string,
		id: PropTypes.number,
		className: PropTypes.string,
	};

	render() {
		return (
			<NavLink to={`/n-module/${this.props.url}`} activeClassName="active" className={`${this.props.className} module`}>{this.props.label}</NavLink>
		);
	}
}

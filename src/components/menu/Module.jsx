import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

export default class Module extends Component {
	static propTypes = {
		label: PropTypes.string,
		url: PropTypes.string,
		id: PropTypes.number,
		className: PropTypes.string,
	};

	render() {
		return (
			<Link to={`/module/${this.props.url}`} activeClassName="active" className={`${this.props.className} module`}>{this.props.label}</Link>
		);
	}
}

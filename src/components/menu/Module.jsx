import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export default class Module extends Component {
	static propTypes = {
		label: PropTypes.string,
		url: PropTypes.string,
		id: PropTypes.number,
		className: PropTypes.string,
		clearList: PropTypes.func,
	};

	render() {
		// console.log(this.props.clearList);
		return (
			<NavLink to={`/module/${this.props.url}`} onClick={this.props.clearList} activeClassName="active" className={`${this.props.className} module`}>{this.props.label}</NavLink>
		);
	}
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';


export default class ListNavLink extends Component {
	static propTypes = {
		tableName: PropTypes.string,
		to: PropTypes.any,
		className: PropTypes.string,
		activeClassName: PropTypes.string,
		isActive: PropTypes.func,
		children: PropTypes.any,
	};

	render() {
		return (<NavLink 
			to={this.props.to} 
			isActive={this.props.isActive} 
			className={this.props.className} 
			activeClassName={this.props.activeClassName} 
		>
			{this.props.children}
		</NavLink>);
	}
}

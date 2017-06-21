import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export class HomeButton extends Component {
	static propTypes = {
		showIcon: React.PropTypes.bool,
		customClass: React.PropTypes.string,
	};

	render() {
		const icon = this.props.showIcon ? <i className="fa fa-home fa-fw"></i> : null;
		return (
			<NavLink to={'/'} className={`home-button ${this.props.customClass}`}>{icon}<span className="nav-label">Dashboard</span></NavLink>
		);
	}
}

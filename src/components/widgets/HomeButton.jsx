import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class HomeButton extends Component {
	static propTypes = {
		showIcon: PropTypes.bool,
		customClass: PropTypes.string,
	};

	render() {
		const icon = this.props.showIcon ? <i className="fa fa-home fa-fw"></i> : null;
		return (
			<Link to={'/'} className={`home-button ${this.props.customClass}`}>{icon}<span className="nav-label">Dashboard</span></Link>
		);
	}
}

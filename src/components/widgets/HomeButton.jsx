import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon } from '../../styles/Icon';

export default class HomeButton extends Component {
	static propTypes = {
		showIcon: PropTypes.bool,
		customClass: PropTypes.string,
	};

	render() {
		const icon = this.props.showIcon ? <Icon icon="home" fw /> : null;
		return (
			<Link to={'/'} className={`home-button ${this.props.customClass}`}>{icon}<span className="nav-label">Dashboard</span></Link>
		);
	}
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NavToggler extends Component {
	static propTypes = {
		toggleNavVisibility: PropTypes.func,

		nav_visibility: PropTypes.bool,
	};

	navToggler = () => {
		const visibility = !this.props.nav_visibility;
		this.props.toggleNavVisibility(visibility);
	}

	render() {
		return <div className="nav-toggler" onClick={this.navToggler}><i className="fa fa-bars"></i></div>;
	}
}

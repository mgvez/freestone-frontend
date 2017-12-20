import React, { Component } from 'react';

export default class NavToggler extends Component {
	static propTypes = {
		toggleNavVisibility: React.PropTypes.func,

		nav_visibility: React.PropTypes.bool,
	};

	navToggler = () => {
		const visibility = !this.props.nav_visibility;
		this.props.toggleNavVisibility(visibility);
	}

	render() {
		return <div className="nav-toggler" onClick={this.navToggler}><i className="fa fa-bars"></i></div>;
	}
}

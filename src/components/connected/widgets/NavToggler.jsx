import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { toggleNavVisibility } from '../../../actions/siteHeader';

@connect(
	state => { 
		return { nav_visibility: state.freestone.siteHeader.nav_visibility };
	},
	dispatch => bindActionCreators({ toggleNavVisibility }, dispatch)
)
export class NavToggler extends Component {
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

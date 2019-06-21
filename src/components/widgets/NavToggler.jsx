import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from '../../styles/Button';
import { Icon } from '../../styles/Icon';

export default class NavToggler extends Component {
	static propTypes = {
		toggleNavVisibility: PropTypes.func,

		nav_visibility: PropTypes.bool,
	};

	navToggler = () => {
		this.props.toggleNavVisibility(!this.props.nav_visibility);
	}

	render() {
		return <Button onClick={this.navToggler} icon><Icon icon="bars" /></Button>;
	}
}

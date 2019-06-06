import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import { Button } from '../../styles/Button';

const StyledToggler = styled(Button)`
	border-radius: 4px;
	padding: 0 15px;

	i {
		margin:0;
	}
`;

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
		return <StyledToggler round onClick={this.navToggler}><i className="fa fa-bars"></i></StyledToggler>;
	}
}

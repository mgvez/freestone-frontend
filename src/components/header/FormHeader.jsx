import React, { Component } from 'react';
import PropTypes from 'prop-types';

import HeaderContainer from './HeaderContainer'; 
import FormHeaderVariation from '../../containers/header/FormHeaderVariation'; 


export default class FormHeader extends Component {
	static propTypes = {
		table: PropTypes.object,
		setLanguageState: PropTypes.func,
		initPreview: PropTypes.func,
		hasLanguageToggle: PropTypes.bool,
		isModal: PropTypes.bool,
		isProdEnv: PropTypes.bool,
		buttons: PropTypes.array,
		children: PropTypes.any,
		language: PropTypes.string,
		lastmodifdate: PropTypes.string,
	};

	render() {
		return (<HeaderContainer>
			<FormHeaderVariation {...this.props}>
				{this.props.children}
			</FormHeaderVariation>
			<FormHeaderVariation isLight {...this.props} />
		</HeaderContainer>);
	}
}

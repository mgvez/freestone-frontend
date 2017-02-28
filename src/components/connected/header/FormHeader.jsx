import React, { Component } from 'react';

import { HeaderContainer } from 'components/static/header/HeaderContainer'; 
import { FormHeaderVariation } from 'components/connected/header/FormHeaderVariation'; 


export class FormHeader extends Component {
	static propTypes = {
		table: React.PropTypes.object,
		setLanguageState: React.PropTypes.func,
		hasLanguageToggle: React.PropTypes.bool,
		isModal: React.PropTypes.bool,
		buttons: React.PropTypes.array,
		children: React.PropTypes.any,
		language: React.PropTypes.string,
		lastmodifdate: React.PropTypes.string,
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

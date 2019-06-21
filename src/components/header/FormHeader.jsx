import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FormHeaderCore from '../../containers/header/FormHeaderCore'; 
import cssVariables from '../../styles/Variables';

/*
	Will make the form header fixed / inline as needed
*/
export default class FormHeader extends Component {
	static propTypes = {
		table: PropTypes.object,
		setLanguageState: PropTypes.func,
		isViewingPreview: PropTypes.bool,
		hasLanguageToggle: PropTypes.bool,
		isModal: PropTypes.bool,
		isProdEnv: PropTypes.bool,
		buttons: PropTypes.array,
		children: PropTypes.any,
		language: PropTypes.string,
		lastmodifdate: PropTypes.string,
	};
	static propTypes = {
		children: PropTypes.any,
	};
	
	static childContextTypes = {
		setHeight: PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.state = { isSticky: false };
	}

	getChildContext() {
		return {
			setHeight: this.setHeight,
		};
	}

	componentDidMount() {
		window.addEventListener('scroll', this.onScroll);
		this.onScroll();
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.onScroll);
	}

	onScroll = () => {
		const st = window.pageYOffset;
		this.setState({ isFixed: (st >= cssVariables.topHeaderHeight + (this.staticHeight / 2)) });
	}

	setHeight = (isLight, h, m) => {
		if (!isLight) {
			this.staticHeight = h;
			this.padStyle = this.padStyle || {

			};
			this.padStyle.height = `${h}px`;
			this.padStyle.marginBottom = `${m}px`;
		}
	}

	getStatic() {
		if (this.static) return this.static;
		this.static = this.props.children.filter(c => !c.props.isLight);
		if (this.static.length > 0) {
			this.static = this.static[0];
		} else {
			this.static = null;
		}
		return this.static;
	}

	getFixed() {
		if (this.fixed) return this.fixed;

		this.fixed = this.props.children.filter(c => c.props.isLight);
		if (this.fixed.length > 0) {
			this.fixed = this.fixed[0];
		} else {
			this.fixed = null;
		}
		return this.fixed;
	}

	render() {
		//add a padding to top when making header fixed, so as not to make content go up
		const pad = this.state.isFixed ? (<div style={this.padStyle} />) : null;

		return (
			<div>
				{pad}
				<FormHeaderCore {...this.props} isLight={this.state.isFixed}>
					{this.props.children}
				</FormHeaderCore>
			</div>
		);
	}

}

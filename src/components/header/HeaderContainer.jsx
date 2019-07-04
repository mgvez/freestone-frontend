import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cssVariables from '../../styles/Variables';

export default class HeaderContainer extends Component {
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
		const isFixed = (st >= this.staticHeight + cssVariables.topHeaderHeight);
		if (isFixed !== this.state.isFixed) this.setState({ isFixed });
	}

	setHeight = (isLight, h) => {
		if (!isLight) {
			this.staticHeight = h;
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
		return (
			<div className="fixed-header" data-fixed={this.state.isFixed}>
				{this.props.children}
			</div>
		);
	}
}

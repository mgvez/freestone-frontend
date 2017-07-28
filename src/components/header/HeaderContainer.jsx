import React, { Component } from 'react';

export class HeaderContainer extends Component {
	static propTypes = {
		children: React.PropTypes.any,
	};
	
	static childContextTypes = {
		setHeight: React.PropTypes.func,
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

		const topHeaderHeight = 60;
		this.setState({ isFixed: (st >= this.staticHeight + topHeaderHeight) });
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

import React, { Component } from 'react';

export class HeaderContainer extends Component {
	static propTypes = {
		children: React.PropTypes.array,
	};
	
	static childContextTypes = {
		setHeight: React.PropTypes.func,
	};

	getChildContext() {
		// it exposes one property "text", any of the components that are
		// rendered inside it will be able to access it
		return {
			setHeight: this.setHeight,
		};
	}

	componentDidMount() {
		window.addEventListener('scroll', this.onScroll);
	}

	onScroll = () => {
		const st = document.body.scrollTop;
		// const headerHeight = this.props.staticHeader.height;
	}

	setHeight(isLight, h) {
		if (!isLight) {
			this.staticHeight = h;
			console.log(this.staticHeight);
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
			<div className="fixed-header">
				{this.props.children}
			</div>
		);
	}
}

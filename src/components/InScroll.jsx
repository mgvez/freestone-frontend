import React, { Component } from 'react';


/**
	Permet de se souvenir d'un scroll dans une page. Quand on la quitte, on call l'action "lockScroll" avec le scroll current, et si ce component est placé dans le component, quand on reviendra à ce path, le scroll sera le même que quand on l'a quitté.
*/

export default class InScroll extends Component {
	static propTypes = {
		children: React.PropTypes.any,
		path: React.PropTypes.string,
		scroll: React.PropTypes.number,
		isReady: React.PropTypes.bool,
		autoLock: React.PropTypes.bool,
		
		lockScroll: React.PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.hasScrolled = false;
	}

	componentWillReceiveProps(nextProps) {
		// console.log(nextProps.scroll);
		if (nextProps.path !== this.props.path) {
			this.hasScrolled = false;
		}
	}

	componentDidUpdate() {
		// console.log(this.props.isReady, this.hasScrolled);
		if (this.props.isReady && !this.hasScrolled) {
			window.scrollTo(0, this.props.scroll || 0);
			this.hasScrolled = true;

			//reset
			this.props.lockScroll(this.props.path, 0);

		}
	}
	componentWillUnmount() {
		if (this.props.autoLock) this.props.lockScroll(this.props.path, window.scrollY);
	}

	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}

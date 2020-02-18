import React, { Component } from 'react';
import PropTypes from 'prop-types';


/**
	Permet de se souvenir d'un scroll dans une page. Quand on la quitte, on call l'action "lockScroll" avec le scroll current, et si ce component est placé dans le component, quand on reviendra à ce path, le scroll sera le même que quand on l'a quitté.
*/

export default class InScroll extends Component {
	static propTypes = {
		children: PropTypes.any,
		route: PropTypes.object,
		scroll: PropTypes.number,
		isReady: PropTypes.bool,
		autoLock: PropTypes.bool,
		className: PropTypes.string,
		
		lockScroll: PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.hasScrolled = false;
		this.state = {
			minHeight: ((this.props.scroll || 0) + window.innerHeight) + 'px',
		};
	}

	componentDidMount() {
		this.performScroll();
	}
	
	componentDidUpdate(prevProps) {
		// console.log(nextProps.scroll);
		if (prevProps.route.pathname !== this.props.route.pathname) {
			this.hasScrolled = false;
		}
		this.performScroll();
	}

	performScroll() {
		// console.log(this.props.path, this.props.isReady, this.hasScrolled, this.props.scroll);
		if (this.props.isReady && !this.hasScrolled) {
			//timeout because sometimes the dom has not updated by the time we scroll
			setTimeout(() => {
				window.scrollTo(0, this.props.scroll || 0);
				// console.log(`scroll to ${this.props.scroll}`, window.scrollY, window.document.height);
				this.hasScrolled = true;
				//reset
				this.props.lockScroll(this.props.route.pathname, 0);
			}, 100);
		}
	}


	componentWillUnmount() {
		if (this.props.autoLock) this.props.lockScroll(this.props.route.pathname, window.scrollY);
	}

	render() {
		return (
			<div className={this.props.className} style={{ minHeight: this.state.minHeight }}>
				{this.props.children}
			</div>
		);
	}
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TweenMax, Circ } from '../../utils/Greensock';

const TOGGLE_ANIM_TIME = 0.3;

export default class Collapsable extends Component {
	static propTypes = {
		onAnimFinish: PropTypes.func,
		animTime: PropTypes.number,

		isCollapsed: PropTypes.bool,
		children: PropTypes.node,
	};


	componentDidUpdate(prevProps) {
		const wasOpen = !prevProps.isCollapsed;
		const isOpen = !this.props.isCollapsed;
		// console.log(wasOpen, isOpen);
		//si on vient d'ouvrir, animate in
		if (wasOpen !== isOpen) this.animate(isOpen, this.props.animTime || TOGGLE_ANIM_TIME);
	}

	componentDidMount() {
		this.animate(!this.props.isCollapsed, 0);
	}

	animate(isOpening, t) {
		const dest = isOpening ? 'from' : 'to';

		const ease = isOpening ? Circ.easeIn : Circ.easeOut;
		// console.log('animate', dest);
		TweenMax.set(this.childrenContainer, { height: 'auto', overflow: 'visible' });
		TweenMax[dest](this.childrenContainer, t, { ease, height: 0, overflow: 'hidden', onComplete: this.props.onAnimFinish });

	}

	getContainer = (el) => {
		this.childrenContainer = el;
	}

	render() {
		return <div ref={this.getContainer}>{this.props.children}</div>;
	}
}

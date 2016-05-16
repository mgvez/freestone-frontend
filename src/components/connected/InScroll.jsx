import React, { Component } from 'react';
import { connect } from 'react-redux';
import { routeSelector } from 'selectors/route';

/**
	Si dans le state du history on veut etre a un scroll au load d'une route, l'enforce
*/

@connect(
	routeSelector
)
export class InScroll extends Component {
	static propTypes = {
		children: React.PropTypes.any,
		path: React.PropTypes.string,
		scroll: React.PropTypes.number,
		isReady: React.PropTypes.bool,
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
		}
	}

	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}

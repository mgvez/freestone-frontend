import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { routeSelector } from 'selectors/route';
import { lockScroll } from 'actions/nav';
/**
	Si dans le state du history on veut etre a un scroll au load d'une route, l'enforce
*/

@connect(
	routeSelector,
	dispatch => bindActionCreators({ lockScroll }, dispatch)
)
export class InScroll extends Component {
	static propTypes = {
		children: React.PropTypes.any,
		path: React.PropTypes.string,
		scroll: React.PropTypes.number,
		isReady: React.PropTypes.bool,
		
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

	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}

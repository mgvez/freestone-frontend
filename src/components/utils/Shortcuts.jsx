import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class Shortcuts extends Component {
	static propTypes = {
		toggleLanguage: PropTypes.func,
		children: PropTypes.any,
	};

	componentDidMount() {
		document.addEventListener('keydown', this.handleKeyDown);
	}

	handleKeyDown = (e) => {
		//alt-l
		// console.log(e);
		if (e.altKey && e.keyCode === 76) {
			this.props.toggleLanguage();
		}
	}
	
	render() {
		return (<div>
			{this.props.children},
		</div>);
	}
}

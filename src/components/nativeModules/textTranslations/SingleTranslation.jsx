import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SingleTranslation extends Component {
	static propTypes = {
		translationKey: PropTypes.string,
		translationValue: PropTypes.string,
		language: PropTypes.string,

		editTranslation: PropTypes.func,
	};

	changeVal = (e) => {
		const v = (e && e.target) ? e.target.value : e;
		this.props.editTranslation(this.props.language, this.props.translationKey, v);
		// console.log(`change ${this.props.translationKey}`);
	}

	render() {
		return (<input type="text" value={this.props.translationValue || ''} onChange={this.changeVal} />);
	}
}

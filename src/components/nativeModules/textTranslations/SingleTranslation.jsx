import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AutoAdjustText from '../../form/inputTypes/AutoAdjustText';

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
		// console.log(`change ${this.props.translationKey} ${v}`);
	}

	render() {
		return (<AutoAdjustText value={this.props.translationValue} onChange={this.changeVal} />);
	}
}

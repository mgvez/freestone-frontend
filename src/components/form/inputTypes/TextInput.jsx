import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Textarea, Input } from '../../../styles/Input';
import AutoAdjustText from './AutoAdjustText';

const MAX_HEIGHT = 600;
const MIN_HEIGHT = 300;

export default class TextInput extends Component {
	static propTypes = {
		changeVal: PropTypes.func,
		field: PropTypes.object,
		val: PropTypes.any,
	};

	render() {
		// console.log(`render input ${this.props.field.name}`);
		// console.log(this.props.val);
		if (this.props.field.size > 100) {
			return (
				<AutoAdjustText 
					value={this.props.val || ''} 
					onChange={this.props.changeVal}
				/>
			);
		}
		return (
			<Input type="text" size={this.props.field.size} value={this.props.val || ''} onChange={this.props.changeVal} />
		);
	}
}

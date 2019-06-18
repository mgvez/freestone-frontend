import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ToggleContainer } from '../../../styles/Input';

export default class BoolInput extends Component {
	static propTypes = {
		changeVal: PropTypes.func,
		small: PropTypes.bool,
		field: PropTypes.object,
		recordId: PropTypes.string,
		val: PropTypes.any,
	};
	
	render() {
		// console.log(`render input ${this.props.field.name}`);
		const id = `${this.props.recordId}-${this.props.field.id}`;
		return (
			<ToggleContainer key={id} small={this.props.small}>
				<input id={id} type="checkbox" value={this.props.val === '1' ? '0' : '1'} checked={this.props.val === '1'} onChange={this.props.changeVal} />
				<label htmlFor={id} data-on-label="Yes" data-off-label="No" />
			</ToggleContainer>
		);
	}
}

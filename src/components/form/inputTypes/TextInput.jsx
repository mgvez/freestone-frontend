import React from 'react';
import PropTypes from 'prop-types';

import { Input } from '../../../styles/Input';
import AutoAdjustText from './AutoAdjustText';

export default function TextInput(props) {
	if (!props.size || props.size > 100) {
		return (
			<AutoAdjustText 
				value={props.val || ''} 
				onChange={props.changeVal}
				placeholder={props.placeholder}
			/>
		);
	}
	return (
		<Input placeholder={props.placeholder} type="text" size={props.size} value={props.val || ''} onChange={props.changeVal} />
	);
}

TextInput.propTypes = {
	changeVal: PropTypes.func,
	size: PropTypes.number,
	val: PropTypes.any,
	placeholder: PropTypes.string,
};

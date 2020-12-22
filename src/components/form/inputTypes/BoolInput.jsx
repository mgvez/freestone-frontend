import React from 'react';
import PropTypes from 'prop-types';

import { ToggleContainer } from '../../../styles/Input';

export default function BoolInput(props) {

	const id = `${props.recordId}-${props.fieldId}`;
	const isChecked = props.val === '1' || props.val === true || props.val === 1;
	return (
		<ToggleContainer key={id} small={props.small}>
			<input id={id} type="checkbox" value={isChecked ? 0 : 1} checked={isChecked} onChange={props.changeVal} />
			<label htmlFor={id} data-on-label="Yes" data-off-label="No" />
		</ToggleContainer>
	);
}

BoolInput.propTypes = {
	changeVal: PropTypes.func,
	small: PropTypes.bool,
	fieldId: PropTypes.number,
	recordId: PropTypes.string,
	val: PropTypes.any,
};

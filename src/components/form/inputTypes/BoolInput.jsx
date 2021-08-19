import React from 'react';
import PropTypes from 'prop-types';

import { ToggleContainer } from '../../../styles/Input';

const noop = () => {};

export default function BoolInput(props) {
	const id = `${props.recordId}-${props.fieldId}`;
	const isChecked = props.val === '1' || props.val === true || props.val === 1;

	const onChange = props.readonly ? noop : () => props.changeVal(!isChecked);
	return (
		<ToggleContainer readonly={props.readonly} small={props.small} hasVal={props.hasValue} showAsChecked={!props.hasValue && props.isCheckedWhenUnset}>
			<input readOnly={props.readonly} id={id} type="checkbox" checked={isChecked} onChange={onChange} />
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
	hasValue: PropTypes.bool,
	isCheckedWhenUnset: PropTypes.bool,
	readonly: PropTypes.bool,
};
BoolInput.defaultProps = {
	hasValue: true,
	isCheckedWhenUnset: false,
};

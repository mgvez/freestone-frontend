import React from 'react';
import PropTypes from 'prop-types';

import { TYPE_IMG, TYPE_BANKIMG, TYPE_FILE } from '../../../freestone/schemaProps';
import TextInput from '../../form/inputTypes/TextInput';
import AutocompleteInput from '../../../containers/form/inputTypes/AutocompleteInput';


export default function QuickeditField(props) {
	const changeVal = (e) => {
		const v = (e && e.target) ? e.target.value : e;
		props.setQuickeditFieldVal(props.field.table_id, props.recordId, props.field.id, v);
	};
	const hasChanged = props.editedVal !== undefined;
	if (props.field.foreign) {
		return <AutocompleteInput field={props.field} val={hasChanged ? props.editedVal : props.val} changeVal={changeVal} />;
	}

	return <TextInput val={hasChanged ? props.editedVal : props.val} changeVal={changeVal} />;

}

QuickeditField.propTypes = {
	table: PropTypes.object,
	field: PropTypes.object,
	recordId: PropTypes.string,
	val: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	editedVal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	setQuickeditFieldVal: PropTypes.func,
};

import React from 'react';
import PropTypes from 'prop-types';

import { TYPE_IMG, TYPE_BANKIMG, TYPE_FILE } from '../../../freestone/schemaProps';
import TextInput from '../../form/inputTypes/TextInput';


export default function QuickeditField(props) {
	const changeVal = (e) => {
		const v = (e && e.target) ? e.target.value : e;
		props.setQuickeditFieldVal(props.field.table_id, props.recordId, props.field.id, v);
	};
	return <TextInput val={props.editedVal || props.val} changeVal={changeVal} />;

}

QuickeditField.propTypes = {
	table: PropTypes.object,
	field: PropTypes.object,
	recordId: PropTypes.string,
	val: PropTypes.string,
	editedVal: PropTypes.string,
	setQuickeditFieldVal: PropTypes.func,
};

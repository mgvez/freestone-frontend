import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BoolInput from '../form/inputTypes/BoolInput';

/*
	Boolean switch used in record lists, to change value without opening record for edition.
*/
export default class BoolSwitch extends Component {
	static propTypes = {
		field: PropTypes.object,
		recordId: PropTypes.string,
		val: PropTypes.any,

		saveSingleValue: PropTypes.func,
	};

	captureBool = (tableId, recordId, fieldId, boolVal) => {
		// console.log(tableId, recordId, fieldId, boolVal);
		const { tableName } = this.props.field;
		this.props.saveSingleValue(tableName, recordId, fieldId, boolVal);
	}

	render() {
		return <BoolInput field={this.props.field} val={this.props.val} recordId={this.props.recordId} setFieldVal={this.captureBool} className="small" />;
	}
}

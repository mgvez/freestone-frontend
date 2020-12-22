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

	captureBool = (e) => {
		const v = (e && e.target) ? e.target.value : e;
		const { tableName, id } = this.props.field;
		this.props.saveSingleValue(tableName, this.props.recordId, id, v);
	}

	render() {
		return <BoolInput fieldId={this.props.field.id} val={this.props.val} recordId={this.props.recordId} changeVal={this.captureBool} small />;
	}
}

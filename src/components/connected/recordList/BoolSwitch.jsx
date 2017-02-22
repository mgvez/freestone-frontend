import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { BoolInput } from 'components/static/form/inputTypes/BoolInput';
import { saveSingleValue } from 'actions/save';

/*
	Boolean switch used in record lists, to change value without opening record for edition.
*/

@connect(
	null,
	dispatch => bindActionCreators({ saveSingleValue }, dispatch)
)
export class BoolSwitch extends Component {
	static propTypes = {
		field: React.PropTypes.object,
		recordId: React.PropTypes.string,
		val: React.PropTypes.any,

		saveSingleValue: React.PropTypes.func,
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

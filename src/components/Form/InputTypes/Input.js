import React, { Component } from 'react';

export class Input extends Component {
	static propTypes = {
		tableName: React.PropTypes.string,
		field: React.PropTypes.object,
		recordId: React.PropTypes.string,
		val: React.PropTypes.string,
		
		setFieldVal: React.PropTypes.func,
		fetchForeignOptions: React.PropTypes.func,
	};

	changeVal = (e) => {
		this.props.setFieldVal(this.props.tableName, this.props.recordId, this.props.field.name, e.target.value);
	};
}

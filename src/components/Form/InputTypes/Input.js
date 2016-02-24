import React, { Component } from 'react';

export class Input extends Component {
	static propTypes = {
		field: React.PropTypes.object,
		recordId: React.PropTypes.string,
		val: React.PropTypes.string,
		origVal: React.PropTypes.string,
		env: React.PropTypes.object,
		
		setFieldVal: React.PropTypes.func,
		fetchForeignOptions: React.PropTypes.func,
	};

	changeVal = (e) => {
		const v = (e && e.target && e.target.value) || e;
		// console.log(this.props.field.table_id, this.props.recordId, this.props.field.id, v);
		this.props.setFieldVal(this.props.field.table_id, this.props.recordId, this.props.field.id, v);
	};
}

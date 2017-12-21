import React, { Component } from 'react';

export default class Input extends Component {
	static propTypes = {
		field: React.PropTypes.object,
		recordId: React.PropTypes.string,
		val: React.PropTypes.any,
		origVal: React.PropTypes.any,
		absolutePath: React.PropTypes.string,
		env: React.PropTypes.object,

		setFieldVal: React.PropTypes.func,
	};

	changeVal = (e) => {
		const v = (e && e.target) ? e.target.value : e;
		// console.log(v);
		this.props.setFieldVal(this.props.field.table_id, this.props.recordId, this.props.field.id, v);
	};
}

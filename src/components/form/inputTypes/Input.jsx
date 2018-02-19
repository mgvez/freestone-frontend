import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Input extends Component {
	static propTypes = {
		field: PropTypes.object,
		recordId: PropTypes.string,
		val: PropTypes.any,
		origVal: PropTypes.any,
		absolutePath: PropTypes.string,
		env: PropTypes.object,

		setFieldVal: PropTypes.func,
	};

	changeVal = (e) => {
		const v = (e && e.target) ? e.target.value : e;
		// console.log(v);
		this.props.setFieldVal(this.props.field.table_id, this.props.recordId, this.props.field.id, v);
	};
}

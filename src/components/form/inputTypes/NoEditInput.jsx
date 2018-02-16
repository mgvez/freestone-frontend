import React from 'react';
import PropTypes from 'prop-types';

import Input from './Input';

export default class NoEditInput extends Input {
	static propTypes = {
		field: PropTypes.object,
		recordId: PropTypes.string,
		val: PropTypes.any,
		//if from foreign foreign
		label: PropTypes.string,

		fetchForeignLabel: PropTypes.func,
	};

	componentWillMount() {
		this.requireData(this.props);
	}

	requireData(props) {
		if (props.field.foreign && props.label === null && props.val && props.val !== '0') {
			this.props.fetchForeignLabel(props.field.id, props.val);
		}
	}

	render() {
		// console.log(`render input ${this.props.field.name}`);
		const val = this.props.label || this.props.val;
		
		return (
			<span>{val}</span>
		);
	}
}

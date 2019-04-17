import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class NoEditInput extends Component {
	static propTypes = {
		field: PropTypes.object,
		recordId: PropTypes.string,
		val: PropTypes.any,
		//if from foreign foreign
		label: PropTypes.string,

		fetchForeignLabel: PropTypes.func,
	};

	componentDidMount() {
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
			<span dangerouslySetInnerHTML={{ __html: val }} />
		);
	}
}

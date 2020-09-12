import React, { Component } from 'react';
import PropTypes from 'prop-types';

import GenericFileInput from '../genericInputs/GenericFileInput';

export default class FileInput extends Component {
	static propTypes = {
		changeVal: PropTypes.func,
	
		field: PropTypes.object,
		recordId: PropTypes.string,
		val: PropTypes.any,
		origVal: PropTypes.any,
		absolutePath: PropTypes.string,
	};

	render() {

		return (<GenericFileInput 
			val={this.props.val}
			origVal={this.props.origVal}
			type={this.props.field.type}
			ratio={this.props.field.size}
			folder={this.props.field.folder}
			fieldId={this.props.field.id}
			recordId={this.props.recordId}
			absolutePath={this.props.absolutePath}
			changeVal={this.props.changeVal}
		/>);

	}
}

import React from 'react';

import { Input } from './Input';
import GenericFileInput from '../genericInputs/GenericFileInput';

export class FileInput extends Input {

	render() {

		return (<GenericFileInput 
			val={this.props.val}
			origVal={this.props.origVal}
			type={this.props.field.type}
			folder={this.props.field.folder}
			fieldId={this.props.field.id}
			recordId={this.props.recordId}
			absolutePath={this.props.absolutePath}
			changeVal={this.changeVal}
		/>);

	}
}

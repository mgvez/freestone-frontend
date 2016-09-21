import React from 'react';

import { Input } from 'components/static/form/inputTypes/Input';
import { GenericFileInput } from 'components/static/form/genericInputs/GenericFileInput';

export class FileInput extends Input {

	render() {

		return (<GenericFileInput 
			val={this.props.val}
			origVal={this.props.origVal}
			type={this.props.field.type}
			folder={this.props.field.folder}
			fieldId={this.props.field.id}
			recordId={this.props.recordId}
			changeVal={this.changeVal}
		/>);

	}
}

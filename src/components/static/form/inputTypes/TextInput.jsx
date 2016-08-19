import React from 'react';

import { Input } from 'components/static/form/inputTypes/Input';

export class TextInput extends Input {

	render() {
		// console.log(`render input ${this.props.field.name}`);
		// console.log(this.props.val);
		if (this.props.field.size > 100) {
			return (
				<textarea value={this.props.val} className="form-control" onChange={this.changeVal} />
			);
		}
		return (
			<input type="text" value={this.props.val} className="form-control" onChange={this.changeVal} />
		);
	}
}

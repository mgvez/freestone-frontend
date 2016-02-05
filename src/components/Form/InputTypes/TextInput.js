import React, { Component } from 'react';

import { Input } from 'components/Form/InputTypes/Input';

export class TextInput extends Input {

	render() {
		// console.log(`render input ${this.props.field.name}`);
		return (
			<input value={this.props.val} onChange={this.changeVal} />
		);
	}
}

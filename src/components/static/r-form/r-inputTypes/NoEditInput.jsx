import React from 'react';

import { Input } from 'components/static/form/inputTypes/Input';

export class NoEditInput extends Input {

	render() {
		// console.log(`render input ${this.props.field.name}`);
		return (
			<span>{this.props.val}</span>
		);
	}
}

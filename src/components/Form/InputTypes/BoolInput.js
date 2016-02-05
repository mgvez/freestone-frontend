import React, { Component } from 'react';

import { Input } from 'components/Form/InputTypes/Input';

export class BoolInput extends Input {

	render() {
		// console.log(`render input ${this.props.field.name}`);
		return (
			<div>
				Yes <input type="radio" value="1" checked={this.props.val === '1'} onChange={this.changeVal} />
				No <input type="radio" value="0" checked={this.props.val === '0'} onChange={this.changeVal} />
			</div>
		);
	}
}

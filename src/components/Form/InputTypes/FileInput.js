import React, { Component } from 'react';

import { Input } from 'components/Form/InputTypes/Input';
import UniqueId from 'utils/UniqueId';


export class FileInput extends Input {

	changeFileVal = (e) => {
		const input = this.refs.inp.getDOMNode();
	};

	render() {
		// console.log(`render input ${this.props.field.name}`);
		return (
			<div>
				{this.props.origVal}
				<input ref="inp" type="file" onChange={this.changeFileVal} />
			</div>
		);
	}
}

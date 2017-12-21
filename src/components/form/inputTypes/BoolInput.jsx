import React from 'react';

import Input from './Input';

export default class BoolInput extends Input {

	render() {
		// console.log(`render input ${this.props.field.name}`);
		const id = `${this.props.recordId}-${this.props.field.id}`;
		return (
			<div className="toggle-container">
				<input id={id} type="checkbox" value={this.props.val === '1' ? '0' : '1'} checked={this.props.val === '1'} onChange={this.changeVal} />
				<label className="toggle" htmlFor={id} data-on-label="Yes" data-off-label="No"></label>
			</div>
		);
	}
}

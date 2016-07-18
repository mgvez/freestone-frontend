import React from 'react';

import { Input } from 'components/static/form/inputTypes/Input';

export class BoolInput extends Input {

	render() {
		// console.log(`render input ${this.props.field.name}`);
		return (
			<div className="toggle-container">
				<input id={this.props.field.id} type="checkbox" value={this.props.val === '1' ? '0' : '1'} checked={this.props.val === '1'} onChange={this.changeVal} />
				<label className="toggle" htmlFor={this.props.field.id} data-on-label="Oui" data-off-label="Non"></label>
			</div>
		);
	}
}

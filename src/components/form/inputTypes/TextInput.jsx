import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TextInput extends Component {
	static propTypes = {
		changeVal: PropTypes.func,
		field: PropTypes.object,
		val: PropTypes.any,
	};

	render() {
		// console.log(`render input ${this.props.field.name}`);
		// console.log(this.props.val);
		if (this.props.field.size > 100) {
			return (
				<textarea value={this.props.val} className="form-control" onChange={this.props.changeVal} />
			);
		}
		return (
			<input type="text" size={this.props.field.size} value={this.props.val} className="form-control" onChange={this.props.changeVal} />
		);
	}
}

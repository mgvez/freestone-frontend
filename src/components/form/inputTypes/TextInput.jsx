import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Textarea, Input } from '../../../styles/Input';

const MAX_HEIGHT = 600;
const MIN_HEIGHT = 300;

export default class TextInput extends Component {
	static propTypes = {
		changeVal: PropTypes.func,
		field: PropTypes.object,
		val: PropTypes.any,
	};

	constructor(props) {
		super(props);
		this.state = {
			height: MIN_HEIGHT,
			overflow: 'hidden',
		};
	}

	componentDidUpdate() {
		this.setAreaHeight();
	}

	componentDidMount() {
		this.setAreaHeight();
	}

	setAreaHeight() {

		const el = this.refs.area;
		if (!el) return;

		if (el.scrollHeight > el.clientHeight) {
			let height = (el.scrollHeight + 20);
			if (height > MAX_HEIGHT) height = MAX_HEIGHT;
			if (height === this.state.height) return;
			this.setState({
				height,
				overflow: height === MAX_HEIGHT ? 'scroll' : 'hidden',
			});
		}
	}

	render() {
		// console.log(`render input ${this.props.field.name}`);
		// console.log(this.props.val);
		if (this.props.field.size > 100) {
			return (
				<Textarea 
					ref="area"
					value={this.props.val || ''} 
					style={{
						overflow: this.state.overflow,
						minHeight: `${MIN_HEIGHT}px`,
						height: `${this.state.height}px`,
					}} 
					onChange={this.props.changeVal}
				/>
			);
		}
		return (
			<Input type="text" size={this.props.field.size} value={this.props.val || ''} onChange={this.props.changeVal} />
		);
	}
}

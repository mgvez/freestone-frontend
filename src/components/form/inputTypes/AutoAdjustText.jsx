import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Textarea } from '../../../styles/Input';

const MAX_HEIGHT = 600;
const MIN_HEIGHT = 0;

export default class AutoAdjustText extends Component {
	static propTypes = {
		value: PropTypes.string,
		onChange: PropTypes.func,
		placeholder: PropTypes.string,
	};

	constructor(props) {
		super(props);
		this.state = {
			height: MIN_HEIGHT,
			overflow: 'hidden',
		};
		this.inputRef = React.createRef();
	}

	componentDidMount() {
		this.setHeight();
	}

	componentDidUpdate() {
		this.setHeight();
	}

	getSelectionStartPosition() {
		return (this.inputRef.current && this.inputRef.current.selectionStart) || 0;
	}

	setHeight() {
		const area = this.inputRef.current;
		if (!area) return;

		if (area.scrollHeight !== this.state.height) {
			let height = area.scrollHeight;
			if (height > MAX_HEIGHT) height = MAX_HEIGHT;

			this.setState({
				height,
				overflow: height === MAX_HEIGHT ? 'scroll' : 'hidden',
			});
		}
	}

	render() {
		const value = this.props.value || '';

		return (<Textarea 
			ref={this.inputRef}
			type="text"
			value={value}
			style={{
				overflow: this.state.overflow,
				height: `${this.state.height}px`,
				maxHeight: `${MAX_HEIGHT}px`,
			}}
			placeholder={this.props.placeholder}
			onChange={this.props.onChange}
		/>);
	}
}

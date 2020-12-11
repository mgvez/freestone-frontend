import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Textarea } from '../../../styles/Input';

const MAX_HEIGHT = 600;

export default class AutoAdjustText extends Component {
	static propTypes = {
		value: PropTypes.string,
		onChange: PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.state = {
			height: 0,
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
		if (area.scrollHeight > area.clientHeight) {
			let height = (area.scrollHeight + 2);
			if (height > MAX_HEIGHT) height = MAX_HEIGHT;
			if (height === this.state.height) return;
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
				minHeight: `${this.state.height}px`,
				maxHeight: `${MAX_HEIGHT}px`,
			}} 
			onChange={this.props.onChange}
		/>);
	}
}

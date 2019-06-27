import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Textarea } from '../../../styles/Input';
import { BANK_IMG_TABLE } from '../../../freestone/SchemaProps';
import { Button } from '../../../styles/Button';
import { PLACEHOLDER } from '../../../freestone/settings';

const MAX_HEIGHT = 600;
const MIN_HEIGHT = 300;

export default class MarkdownInput extends Component {
	static propTypes = {
		changeVal: PropTypes.func,
		setFieldVal: PropTypes.func,
		setupBankSelect: PropTypes.func,
		goTo: PropTypes.func,
		route: PropTypes.string,
		field: PropTypes.object,
		recordId: PropTypes.string,
		lang: PropTypes.string,
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

	gotoSelectBankImg = () => {

		const el = this.refs.area;
		if (!el) return;
		console.log(this.props.route);
		const currentVal = el.value || '';
		const startPosition = el.selectionStart || 0;
		// const endPosition = myElement.selectionEnd;

		const newVal = currentVal.substring(0, startPosition) + PLACEHOLDER + currentVal.substring(startPosition);

		this.props.setFieldVal(this.props.field.table_id, this.props.recordId, this.props.field.id, newVal);

		this.props.setupBankSelect(
			this.props.field.table_id,
			this.props.recordId,
			this.props.field.id,
			this.props.field.type,
			this.props.field.lang,
			this.props.route
		);
		this.props.goTo(`/list/${BANK_IMG_TABLE}/`);
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

		return (
			<div>
				<Button small onClick={this.gotoSelectBankImg}>Add image</Button>
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
			</div>

		);
		
	}
}

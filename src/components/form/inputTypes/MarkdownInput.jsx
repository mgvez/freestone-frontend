import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AutoAdjustText from './AutoAdjustText';
import { BANK_IMG_TABLE } from '../../../freestone/schemaProps';
import { Button } from '../../../styles/Button';
import { PLACEHOLDER } from '../../../freestone/settings';


export default class MarkdownInput extends Component {
	static propTypes = {
		changeVal: PropTypes.func,
		setFieldVal: PropTypes.func,
		setupBankSelect: PropTypes.func,
		goTo: PropTypes.func,
		route: PropTypes.object,
		field: PropTypes.object,
		recordId: PropTypes.string,
		lang: PropTypes.string,
		val: PropTypes.any,
	};


	gotoSelectBankImg = () => {

		const el = this.refs.inp;
		if (!el) return;
		
		// console.log(this.props.route);
		const currentVal = this.props.val || '';
		const startPosition = el.getSelectionStartPosition();
		// const endPosition = myElement.selectionEnd;

		const newVal = currentVal.substring(0, startPosition) + PLACEHOLDER + currentVal.substring(startPosition);

		this.props.setFieldVal(this.props.field.table_id, this.props.recordId, this.props.field.id, newVal);

		this.props.setupBankSelect(
			this.props.field.table_id,
			this.props.recordId,
			this.props.field.id,
			this.props.field.type,
			this.props.lang,
			this.props.route.pathname
		);
		this.props.goTo(`/list/${BANK_IMG_TABLE}/`);
	}

	render() {
		// console.log(`render input ${this.props.field.name}`);
		// console.log(this.props.val);

		return (
			<div>
				<Button small onClick={this.gotoSelectBankImg}>Add image</Button>
				<AutoAdjustText 
					ref="inp"
					value={this.props.val || ''} 
					onChange={this.props.changeVal}
				/>
			</div>

		);
		
	}
}

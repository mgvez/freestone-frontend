import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { TYPE_IMG, BANK_IMG_TABLE, BANK_PATH_ALIAS } from '../../../freestone/schemaProps';

import GenericFileInput from '../genericInputs/GenericFileInput';
import CroppableBankImgInput from '../../../containers/form/genericInputs/CroppableBankImgInput';
import { Button } from '../../../styles/Button';
import { Icon } from '../../../styles/Icon';
import { getSavedInput } from '../../../freestone/fileInputs';

export default class BankImgInput extends Component {
	static propTypes = {
		changeVal: PropTypes.func,
		bankDestination: PropTypes.object,
		lang: PropTypes.string,
		field: PropTypes.object,
		recordId: PropTypes.string,
		route: PropTypes.string,
		val: PropTypes.any,
		goTo: PropTypes.func,
		setupBankSelect: PropTypes.func,
	};
	constructor(props) {
		super(props);
		this.state = {
			isCroppingBankImg: null,
		};
	}

	gotoSelect = () => {
		this.props.setupBankSelect(
			this.props.field.table_id,
			this.props.recordId,
			this.props.field.id,
			this.props.field.type,
			this.props.lang,
			this.props.route
		);
		this.props.goTo(`/list/${BANK_IMG_TABLE}/`);
	}

	changeValue = (v) => {
		this.props.changeVal(v);
	};

	delete = () => {
		this.changeValue(0);
	};

	componentDidUpdate() {
		const bankImgId = Number(this.props.val);
		if (!bankImgId && this.props.val) {
			const fileInput = getSavedInput(this.props.val);
			if (!fileInput) {
				this.delete();
			}
		}
	}

	render() {
		let bankImgId = Number(this.props.val);
		let hasLocalFile = false;
		// check whether there's a saved input for current value.
		if (!bankImgId && bankImgId !== 0 && this.props.val && this.props.val !== '0') {
			const fileInput = getSavedInput(this.props.val);
			if (fileInput) {
				//if we have a file input, we need to know if it's a bank crop, or an upload file
				bankImgId = Number(fileInput.getBankItemId());
				if (!bankImgId) {
					hasLocalFile = fileInput.hasFile();
				}
			}
		}
		if (!bankImgId) {
			let chooseBtn;
			if (!hasLocalFile) {
				chooseBtn = <Button small round bordered info onClick={this.gotoSelect}><Icon icon="check" /> Choose in bank</Button>;
			}
			return (
				<div>
					<GenericFileInput 
						type={TYPE_IMG}
						ratio={this.props.field.size}
						fieldId={this.props.field.id}
						recordId={this.props.recordId}
						val={(this.props.val !== '0' && this.props.val) || null}
						changeVal={this.changeValue}
					/>
					{chooseBtn}
				</div>
			);
		} 
		return (
			<CroppableBankImgInput
				fieldId={this.props.field.id}
				recordId={this.props.recordId}
				ratio={this.props.field.size}
				id={bankImgId}
				val={this.props.val}
				gotoSelect={this.gotoSelect}
				delete={this.delete}
				changeVal={this.changeValue}
			/>
		);

	}
}

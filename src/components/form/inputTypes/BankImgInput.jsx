import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TYPE_IMG, BANK_IMG_TABLE } from '../../../freestone/SchemaProps';

import BankImgThumbnail from '../../../containers/fileThumbnail/BankImgThumbnail';
import GenericFileInput from '../genericInputs/GenericFileInput';
import { Button } from '../../../styles/Button';

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

	gotoSelect = () => {
		this.props.setupBankSelect(
			this.props.field.table_id,
			this.props.recordId,
			this.props.field.id,
			this.props.field.type,
			this.props.route
		);
		this.props.goTo(`/list/${BANK_IMG_TABLE}/`);
	}

	handleEditorChange = (v) => {
		// console.log('set val', v);
		this.props.changeVal(v);
	};

	delete = () => {
		this.handleEditorChange(0);
	};

	render() {

		const bankImgId = Number(this.props.val);
		const hasLocalFile = bankImgId !== 0 && !bankImgId;
		const localFileId = hasLocalFile ? this.props.val : null;

		const bankThumbnail = bankImgId ? <BankImgThumbnail id={bankImgId} onClick={this.gotoSelect} /> : null;

		const label = bankImgId ? 'Change' : 'Choose image';
		const deleteBtn = bankImgId ? <Button round danger bordered onClick={this.delete}>Remove value</Button> : null;

		//si une image de banque deja placée, on peut pas mettre un fichier direct. O peut juste changer l'image de la banque, parce que sinon ça donne l'impression que le fichier direct edit le record de banque.
		let localFileInput = null;
		if (!bankImgId) {
			localFileInput = (<GenericFileInput 
				type={TYPE_IMG}
				fieldId={this.props.field.id}
				recordId={this.props.recordId}
				val={localFileId}
				changeVal={this.handleEditorChange}
			/>);
		}

		return (
			<div className="bank-image-input-thumbnail">
				{bankThumbnail}
				<Button round bordered info onClick={this.gotoSelect}><i className="fa fa-check"></i>{label}</Button>
				{deleteBtn}
				{localFileInput}
			</div>
		);
	}
}

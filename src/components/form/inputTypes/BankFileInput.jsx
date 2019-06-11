import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TYPE_IMG, BANK_DOCS_TABLE } from '../../../freestone/SchemaProps';

import BankFileThumbnail from '../../../containers/fileThumbnail/BankFileThumbnail';
import GenericFileInput from '../genericInputs/GenericFileInput';

export default class BankFileInput extends Component {
	static propTypes = {
		changeVal: PropTypes.func,
		lang: PropTypes.string,

		field: PropTypes.object,
		recordId: PropTypes.string,
		route: PropTypes.string,
		val: PropTypes.any,
		goTo: PropTypes.func,
		setupBankSelect: PropTypes.func,
	};

	handleEditorChange = (v) => {
		// console.log('set val', v);
		this.props.changeVal(v);
	};

	delete = () => {
		this.handleEditorChange(0);
	};

	gotoSelect = () => {
		this.props.setupBankSelect(
			this.props.field.table_id,
			this.props.recordId,
			this.props.field.id,
			this.props.field.type,
			this.props.route
		);
		this.props.goTo(`/list/${BANK_DOCS_TABLE}/`);
	}

	render() {

		const bankFileId = Number(this.props.val);
		const hasLocalFile = bankFileId !== 0 && !bankFileId;
		const localFileId = hasLocalFile ? this.props.val : null;

		const bankThumbnail = bankFileId ? <BankFileThumbnail id={bankFileId} /> : null;

		const label = bankFileId ? 'Change' : 'Choose file from bank';
		const deleteBtn = bankFileId ? <button className="button-round-danger-bordered" onClick={this.delete}>Remove value</button> : undefined;

		//si une image de banque deja placée, on peut pas mettre un fichier direct. O peut juste changer l'image de la banque, parce que sinon ça donne l'impression que le fichier direct edit le record de banque.
		let localFileInput = null;
		if (!bankFileId) {
			localFileInput = (<GenericFileInput 
				type={TYPE_IMG}
				fieldId={this.props.field.id}
				recordId={this.props.recordId}
				val={localFileId}
				changeVal={this.handleEditorChange}
			/>);
		}

		return (
			<div className="bank-file-input-thumbnail">
				{bankThumbnail}
				<button className="button-round-action-bordered" onClick={this.gotoSelect}>{label}</button>
				{deleteBtn}
				{localFileInput}
			</div>
		);
	}
}

import React from 'react';

import { Input } from './Input';
import BankFileThumbnail from '../../../containers/fileThumbnail/BankFileThumbnail';
import { BankFileInsert } from '../helpers/BankFileInsert';
import { GenericFileInput } from '../genericInputs/GenericFileInput';
import { TYPE_IMG } from '../../../freestone/schemaProps';

export class BankFileInput extends Input {
	static propTypes = {
		lang: React.PropTypes.string,
	};

	constructor(props) {
		super(props);

		this.state = {
			isChoosing: false,
		};
	}

	openModal = () => {
		this.setState({ isChoosing: true });
	}

	closeModal = () => {
		this.setState({ isChoosing: false });
	};

	handleEditorChange = (v) => {
		// console.log('set val', v);
		this.changeVal(v);
	};

	delete = () => {
		this.handleEditorChange(0);
	};

	render() {

		if (this.state.isChoosing) {
			return <BankFileInsert onClose={this.closeModal} setVal={this.handleEditorChange} lang={this.props.lang} />;
		}

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
				<button className="button-round-action-bordered" onClick={this.openModal}>{label}</button>
				{deleteBtn}
				{localFileInput}
			</div>
		);
	}
}

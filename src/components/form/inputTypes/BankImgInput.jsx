import React from 'react';

import { TYPE_IMG } from '../../../freestone/schemaProps';

import Input from './Input';
import BankImgThumbnail from '../../../containers/fileThumbnail/BankImgThumbnail';
import BankImgInsert from '../../../containers/form/helpers/BankImgInsert';
import GenericFileInput from '../genericInputs/GenericFileInput';

export default class BankImgInput extends Input {
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
			return <BankImgInsert onClose={this.closeModal} setVal={this.handleEditorChange} lang={this.props.lang} />;
		}

		const bankImgId = Number(this.props.val);
		const hasLocalFile = bankImgId !== 0 && !bankImgId;
		const localFileId = hasLocalFile ? this.props.val : null;

		const bankThumbnail = bankImgId ? <BankImgThumbnail id={bankImgId} onClick={this.openModal} /> : null;

		const label = bankImgId ? 'Change' : 'Choose image from bank';
		const deleteBtn = bankImgId ? <button className="button-round-danger-bordered" onClick={this.delete}>Remove value</button> : undefined;

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
				<button className="button-round-action-bordered" onClick={this.openModal}>{label}</button>
				{deleteBtn}
				{localFileInput}
			</div>
		);
	}
}

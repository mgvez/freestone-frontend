import React from 'react';

import { Input } from 'components/static/form/inputTypes/Input';
import { BankImgThumbnail } from 'components/connected/fileThumbnail/BankImgThumbnail';
import { BankImgInsert } from 'components/connected/form/helpers/BankImgInsert';
import { GenericFileInput } from 'components/static/form/genericInputs/GenericFileInput';
import { TYPE_IMG } from 'freestone/schemaProps';

export class BankImgInput extends Input {
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
		this.changeVal(v);
	};

	delete = (e) => {
		this.handleEditorChange(null);
	};

	render() {

		if (this.state.isChoosing) {
			return <BankImgInsert onClose={this.closeModal} setVal={this.handleEditorChange} lang={this.props.lang} />;
		}

		const bankImgId = Number(this.props.val);
		const hasLocalFile = bankImgId !== 0 && !bankImgId;
		const localFileId = hasLocalFile ? this.props.val : null;

		const bankThumbnail = bankImgId ? <BankImgThumbnail id={bankImgId} /> : null;

		const label = bankImgId ? 'Change' : 'Choose image from bank';
		const deleteBtn = bankImgId ? <button className="button-round-danger-bordered" onClick={this.delete}>Remove value</button> : undefined;

		return (
			<div className="bank-image-input-thumbnail">

				{bankThumbnail}
				<button className="button-round-action-bordered" onClick={this.openModal}>{label}</button>
				{deleteBtn}

				<GenericFileInput 
					type={TYPE_IMG}
					fieldId={this.props.field.id}
					recordId={this.props.recordId}
					val={localFileId}
					changeVal={this.handleEditorChange}
				/>
			</div>
		);
	}
}

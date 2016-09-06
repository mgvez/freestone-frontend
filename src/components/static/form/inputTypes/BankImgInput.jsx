import React from 'react';

import { Input } from 'components/static/form/inputTypes/Input';
import { BankImgThumbnail } from 'components/connected/fileThumbnail/BankImgThumbnail';
import { BankImgInsert } from 'components/connected/form/helpers/BankImgInsert';

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
		const id = Number(this.props.val);
		const label = id ? 'Change image' : 'Choose image';
		const deleteBtn = id ? <button className="button-round-danger-bordered" onClick={this.delete}>Delete</button> : undefined;
		return (<div className="bank-image-input-thumbnail">
			<BankImgThumbnail id={id} />
			<button className="button-round-action-bordered" onClick={this.openModal}>{label}</button>
			{deleteBtn}
		</div>);
	}
}

import React from 'react';

import { Input } from 'components/static/form/inputTypes/Input';
import { BankImgThumbnail } from 'components/connected/fileThumbnail/BankImgThumbnail';
import { BankImgInsert } from 'components/connected/form/helpers/BankImgInsert';

export class BankImgInput extends Input {
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

	render() {
		if (this.state.isChoosing) {
			return <BankImgInsert onClose={this.closeModal} setVal={this.handleEditorChange} />;
		}
		const id = Number(this.props.val);
		const label = id ? 'Changer image' : 'Choisir image';
		return (<div>
			<BankImgThumbnail id={id} />
			<button className="button-round-action-bordered" onClick={this.openModal}>{label}</button>
		</div>);
	}
}

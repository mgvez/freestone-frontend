import React from 'react';

import Input from './Input';
import HotspotInsert from '../helpers/HotspotInsert';
import BankImgThumbnail from '../../../containers/fileThumbnail/BankImgThumbnail';

export default class HotspotInput extends Input {
	static propTypes = {
		lang: React.PropTypes.string,
		field: React.PropTypes.object,
		imageId: React.PropTypes.string,
		parsedVal: React.PropTypes.object,
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

	delete = () => {
		this.handleEditorChange(null);
	};

	render() {
		if (this.state.isChoosing) {
			return (<HotspotInsert {...this.props} onClose={this.closeModal} onSave={this.handleEditorChange} />);
		}

		const label = (!this.props.val) ? 'Add a hotspot' : 'Modify hotspot';

		const preview = this.props.parsedVal.x !== -1 ? (<div className="hotspot-image-container preview" onClick={this.openModal}>
			<div className="hotspot" style={{ left: `${this.props.parsedVal.x * 100}%`, top: `${this.props.parsedVal.y * 100}%` }}></div>
			<BankImgThumbnail id={this.props.imageId} maxSize={400} />
		</div>) : '';

		return (
			<div>
				<input type="hidden" value={this.props.val} />
				<button onClick={this.openModal} className="button-round-bordered-action">{label}</button>
				<br />
				{preview}
			</div>
		);
	}
}

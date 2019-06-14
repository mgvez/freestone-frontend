import React, { Component } from 'react';
import PropTypes from 'prop-types';

import HotspotInsert from '../helpers/HotspotInsert';
import BankImgThumbnail from '../../../containers/fileThumbnail/BankImgThumbnail';
import { Button } from '../../../styles/Button';

export default class HotspotInput extends Component {
	static propTypes = {
		changeVal: PropTypes.func,
		lang: PropTypes.string,
		field: PropTypes.object,
		imageId: PropTypes.string,
		parsedVal: PropTypes.object,
		val: PropTypes.any,
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
		this.props.changeVal(v);
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
				<Button onClick={this.openModal} round bordered>{label}</Button>
				<br />
				{preview}
			</div>
		);
	}
}

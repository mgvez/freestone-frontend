import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import BankImgThumbnail from '../../../containers/fileThumbnail/BankImgThumbnail';
import customStyle from '../../../styles/Modal';
import { Button } from '../../../styles/Button';

export default class HotspotInsert extends Component {
	static propTypes = {
		lang: PropTypes.string,
		onClose: PropTypes.func,
		parentRecordId: PropTypes.string,
		imageFieldId: PropTypes.number,
		onSave: PropTypes.func,
		imageId: PropTypes.string,
		parsedVal: PropTypes.object,
	};

	constructor(props) {
		super(props);
		this.state = {
			x: this.props.parsedVal.x,
			y: this.props.parsedVal.y,
		};
	}

	onClickImage = (e) => {
		this.setState({
			x: e.nativeEvent.offsetX / this.container.clientWidth,
			y: e.nativeEvent.offsetY / this.container.clientHeight,
		});
	}

	save = () => {
		const pos = JSON.stringify(this.state);
		this.props.onSave(pos);
		this.props.onClose();
	}

	cancelChange = () => {
		this.props.onClose();
	}

	render() {
		const saveBtn = this.state.x !== -1 ? (<Button onClick={this.save} round>Save</Button>) : '';
		return (
			<Modal
				isOpen
				contentLabel="Hotspot"
				closeTimeoutMS={300}
				style={customStyle}
			>
				<div className="hotspot-header">
					<h2 className="hotspot-title">Click on the image to place a hotspot</h2>
					<div className="buttons hotspot-buttons">
						{saveBtn} 
						<Button onClick={this.cancelChange} round danger>Cancel</Button> 
					</div>
				</div>
				<div className="hotspot-image-container" ref={(div) => { this.container = div; }} onClick={this.onClickImage}>
					<div className="hotspot" style={{ left: `${this.state.x * 100}%`, top: `${this.state.y * 100}%` }}></div>
					<BankImgThumbnail id={this.props.imageId} maxSize={1920} />
				</div>
			</Modal>
		);
	}
}

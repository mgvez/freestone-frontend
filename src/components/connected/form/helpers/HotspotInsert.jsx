import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { hotspotSelector } from 'selectors/hotspot.js';

import { BankImgThumbnail } from 'components/connected/fileThumbnail/BankImgThumbnail';

import Modal from 'react-modal';
import customStyle from 'components/styles/modalStyles.js';

@connect(
	hotspotSelector,
)
export class HotspotInsert extends Component {
	static propTypes = {
		val: React.PropTypes.object,
		lang: React.PropTypes.string,
		onClose: React.PropTypes.func,
		parentRecordId: React.PropTypes.string,
		imageFieldId: React.PropTypes.number,
		setVal: React.PropTypes.func,
		imageId: React.PropTypes.string,
	};

	componentWillMount() {
		this.setState({
			x: this.props.val.x,
			y: this.props.val.y,
		});
	}

	onClickImage = (e) => {
		this.setState({
			x: e.nativeEvent.offsetX / this.container.clientWidth,
			y: e.nativeEvent.offsetY / this.container.clientHeight,
		});
	}

	save = () => {
		const pos = JSON.stringify(this.state);
		this.props.setVal(pos);
		this.props.onClose();
	}

	cancelChange = () => {
		this.props.onClose();
	}

	render() {
		return (
			<Modal
				isOpen
				contentLabel="Hotspot"
				closeTimeoutMS={300}
				style={customStyle}
			>
				<div className="buttons">
					<button onClick={this.cancelChange} className="button-round-bordered-action">Cancel</button>
					<button onClick={this.save} className="button-round-bordered-action">Save</button>
				</div>
				<div className="hotspot-image-container" ref={(div) => { this.container = div; }} onClick={this.onClickImage}>
					<div className="hotspot" style={{ left: `${this.state.x * 100}%`, top: `${this.state.y * 100}%` }}></div>
					<BankImgThumbnail id={this.props.imageId} maxSize={1920} />
				</div>
			</Modal>
		);
	}
}

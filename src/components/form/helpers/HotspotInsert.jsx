import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import styled from 'styled-components';

import BankImgThumbnail from '../../../containers/fileThumbnail/BankImgThumbnail';
import customStyle from '../../../styles/Modal';
import { Button } from '../../../styles/Button';

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 0 0 20px;
`;

const Buttons = styled.div`
	[class^=button] {
		margin-left: 10px;
	}
`;

const Title = styled.div`
	margin: 0;
`;

export const ImageContainer = styled.div`
	position: relative;
	cursor: pointer;
	display: inline-block;
	overflow: hidden;

	&.preview {
		margin-top: 20px;
	}

	img {
		max-width: 100%;
		pointer-events: none;
	}
`;

export const HotspotElem = styled.div`
	position: absolute;
	width: 30px;
	height: 30px;
	border: 1px solid #fff;
	transform: translate(-50%, -50%);
	cursor: pointer;
	pointer-events: none;

	&:before, &:after {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 6px;
		height: 2px;
		background: #fff;
		transform: translate(-50%, -50%);
	}

	&:before {
		transform: translate(-50%, -50%) rotate(90deg);
	}
`;

export default class HotspotInsert extends Component {
	static propTypes = {
		lang: PropTypes.string,
		onClose: PropTypes.func,
		parentRecordId: PropTypes.string,
		imageFieldId: PropTypes.number,
		onSave: PropTypes.func,
		imageId: PropTypes.string,
		imageBankItem: PropTypes.object,
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
		const saveBtn = this.state.x !== -1 ? (<Button onClick={this.save} round="true">Save</Button>) : '';
		return (
			<Modal
				ariaHideApp={false}
				isOpen
				contentLabel="Hotspot"
				closeTimeoutMS={300}
				style={customStyle}
			>
				<Header>
					<Title>Click on the image to place a hotspot</Title>
					<Buttons className="buttons hotspot-buttons">
						{saveBtn} 
						<Button onClick={this.cancelChange} round="true" danger="true">Cancel</Button> 
					</Buttons>
				</Header>
				<ImageContainer ref={(div) => { this.container = div; }} onClick={this.onClickImage}>
					<HotspotElem style={{ left: `${this.state.x * 100}%`, top: `${this.state.y * 100}%` }} />
					{/* <BankImgThumbnail id={this.props.imageBankItem.} maxSize={1920} /> */}
					<img style={{ maxWidth: 'none', width: 'auto' }} src={this.props.imageBankItem.item.file_path} alt="" />
				</ImageContainer>
			</Modal>
		);
	}
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import 'react-image-crop/lib/ReactCrop.scss';

import { SavedFileInput } from '../../../freestone/fileInputs';
import FileThumbnail from '../../../containers/fileThumbnail/FileThumbnail';
import Cropper from '../../images/Cropper';
import { TYPE_IMG, BANK_PATH_ALIAS } from '../../../freestone/schemaProps';
import { Button } from '../../../styles/Button';
import { THUMBNAIL_SIZE } from '../../../freestone/settings';
import { Icon } from '../../../styles/Icon';
import BankImgThumbnail from '../../../containers/fileThumbnail/BankImgThumbnail';


const Container = styled.div`
	display: inline-block;
	vertical-align: middle;
`;

const FileInfos = styled.div`
	font-style: italic;
	display: block;
	margin-right: 10px;
	max-width: ${THUMBNAIL_SIZE}px;

	a {
		display: block;
		margin-bottom: 5px;
	}
`;

const FileInputContainer = styled.div`
	display: inline-block;
	vertical-align: bottom;

	input {
		display:none;
	}

	button {
		margin-right: 10px
	}
`;

export default class CroppableBankImgInput extends Component {

	static propTypes = {
		gotoSelect: PropTypes.func,
		delete: PropTypes.func,

		fieldId: PropTypes.number,
		recordId: PropTypes.string,
		val: PropTypes.string,
		id: PropTypes.number,
		imageBankItem: PropTypes.object,
		fetchImageBankItem: PropTypes.func,
		changeVal: PropTypes.func,

	};
	constructor(props) {
		super(props);
		this.state = {
			isCropping: false,
		};
	}
	componentDidMount() {
		this.requireData(this.props);
	}

	componentDidUpdate() {
		this.requireData(this.props);
	}
	requireData(props) {
		const { id, imageBankItem } = props;

		if (id && !imageBankItem) {
			this.props.fetchImageBankItem(id);
		}
	}

	getSavedInput() {
		return new SavedFileInput(this.props.val);
	}

	setIsCropping = isCropping => {
		this.setState({
			isCropping,
		});
	}

	setCrop = (newCrop) => {
		const savedInput = this.getSavedInput();
		savedInput.setCropSettings(newCrop);
		savedInput.setBankItemId(this.props.id);
		this.props.changeVal(savedInput.getId());
	}

	render() {

		let cropper = null;
		// console.log(this.props.imageBankItem);
		const imageAbsolutePath = this.props.imageBankItem && this.props.imageBankItem.item[BANK_PATH_ALIAS];

		const savedInput = this.getSavedInput();

		const currentCrop = savedInput.getCropSettings();
		if (this.state.isCropping) {
			cropper = (
				<Cropper
					src={imageAbsolutePath}
					setIsCropping={this.setIsCropping}
					setCrop={this.setCrop}
					crop={currentCrop}
				/>
			);
		}
		// console.log(currentCrop);
		let thumbnail;
		if (!currentCrop) {
			thumbnail = <BankImgThumbnail id={this.props.id} onClick={this.props.gotoSelect} />;
		} else {
			thumbnail = (<FileThumbnail
				absolutePath={imageAbsolutePath}
				type={TYPE_IMG}
				crop={currentCrop}
			/>);
		}
		
		return (
			<Container>
				{cropper}
				<FileInfos>
					{thumbnail}
				</FileInfos>

				<Button small round bordered info onClick={this.props.gotoSelect}><Icon icon="exchange-alt" /> Change</Button>	
				<Button small round danger bordered onClick={this.props.delete}><Icon icon="times" /> Remove value</Button>
				<Button round small bordered cta faded onClick={() => this.setIsCropping(true)}><Icon icon="crop" />Crop</Button>

			</Container>
		);
	}
}

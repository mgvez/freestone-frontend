import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { SavedFileInput } from '../../../freestone/fileInputs';
import FileThumbnail from '../../../containers/fileThumbnail/FileThumbnail';
import RatioWarning from '../../images/RatioWarning';
import FileInfos from './FileInfos';
import Cropper from '../../images/Cropper';
import { TYPE_IMG, BANK_PATH_ALIAS } from '../../../freestone/schemaProps';
import { Button } from '../../../styles/Button';
import { Icon } from '../../../styles/Icon';
import BankImgThumbnail from '../../../containers/fileThumbnail/BankImgThumbnail';
import { useImageDimensions } from '../../../hooks/imageDimensions';


const Container = styled.div`
	display: inline-block;
	vertical-align: middle;
`;

const CroppableBankImgInput = (props) => {
	const [isCropping, setIsCropping] = useState(false);

	const { id, imageBankItem } = props;

	const imageAbsolutePath = imageBankItem && imageBankItem.item[BANK_PATH_ALIAS];
	const [localImgWidth, localImgHeight] = useImageDimensions(imageAbsolutePath);

	useEffect(() => {
		if (id && !imageBankItem) {
			props.fetchImageBankItem(id);
		}
	}); 

	if (id && !imageBankItem) {
		return null;
	}
	const savedInput = new SavedFileInput(props.val);

	const setCrop = (newCrop) => {
		savedInput.setCropSettings(newCrop);
		savedInput.setBankItemId(props.id);
		props.changeVal(savedInput.getId());
	};

	let cropper = null;
	// console.log(props.imageBankItem);
	const currentCrop = savedInput.getCropSettings();

	const ratioWarning = (
		<RatioWarning key="ratio" imageWidth={localImgWidth} imageHeight={localImgHeight} suggestedRatio={props.ratio} crop={currentCrop} />
	);

	if (isCropping) {
		cropper = (
			<Cropper
				src={imageAbsolutePath}
				setIsCropping={setIsCropping}
				setCrop={setCrop}
				crop={currentCrop}
				ratio={props.ratio}
			/>
		);
	}
	// console.log(currentCrop);
	let thumbnail;
	if (!currentCrop) {
		thumbnail = <BankImgThumbnail id={props.id} onClick={props.gotoSelect} />;
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
			<FileInfos thumbnail={thumbnail} warnings={[ratioWarning]} />
			<Button small round bordered info onClick={props.gotoSelect}><Icon icon="exchange-alt" /> Change</Button>	
			<Button small round danger bordered onClick={props.delete}><Icon icon="times" /> Remove value</Button>
			<Button round small bordered cta faded onClick={() => setIsCropping(true)}><Icon icon="crop" />Crop</Button>
		</Container>
	);
};

CroppableBankImgInput.propTypes = {
	gotoSelect: PropTypes.func,
	delete: PropTypes.func,

	ratio: PropTypes.number,
	fieldId: PropTypes.number,
	recordId: PropTypes.string,
	val: PropTypes.string,
	id: PropTypes.number,
	imageBankItem: PropTypes.object,
	fetchImageBankItem: PropTypes.func,
	changeVal: PropTypes.func,

};
export default CroppableBankImgInput;

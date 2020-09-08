import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import ReactCrop from 'react-image-crop';
import { Button } from '../../styles/Button';
import { Icon } from '../../styles/Icon';
import customStyle from '../../styles/Modal.js';

const Cropper = (props) => {
	const [crop, setCrop] = useState(null);
	const currentCrop = crop || props.crop || { unit: '%' };
	const hasCropped = !!crop;
	const receiveCrop = (newCrop, newCropPrc) => {
		setCrop(newCropPrc);
	};
	
	const acceptCrop = () => {
		props.setCrop(currentCrop);
		props.setIsCropping(false);
	};
	const cancel = () => {
		props.setIsCropping(false);
	};

	return (
		<Modal
			isOpen
			onRequestClose={cancel}
			closeTimeoutMS={300}
			style={customStyle}
			ariaHideApp={false}
		>
			<ReactCrop src={props.src} crop={currentCrop} onChange={receiveCrop} />
			<Button round bordered cta onClick={acceptCrop} disabled={!hasCropped}><Icon icon="crop" />OK</Button>
			<Button round bordered danger onClick={cancel}><Icon icon="times" />Cancel</Button>
		</Modal>
	);

};

Cropper.propTypes = {
	crop: PropTypes.object,
	src: PropTypes.string,
	setIsCropping: PropTypes.func,
	setCrop: PropTypes.func,
};

export default Cropper;

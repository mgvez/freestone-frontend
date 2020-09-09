import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import styled from 'styled-components';

import ReactCrop from 'react-image-crop';
import { Button } from '../../styles/Button';
import { Icon } from '../../styles/Icon';
import customStyle from '../../styles/Modal.js';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	p {
		margin: 0 0 20px;
	}

`;

const ImageContainer = styled.div`
	display: flex;
	align-items: center;
	flex: 1 0 100%;

	img {
		border: 1px grey solid;
		max-width: 70vw;
		max-height: 70vh;
		width: auto;
		height: auto;
	}
`;
const FcnContainer = styled.div`

	margin: 20px 0;
	flex: 1 0 100%;
`;

const notCropped = { unit: '%' };

const Cropper = (props) => {
	const [crop, setCrop] = useState(null);
	const currentCrop = crop || props.crop || notCropped;
	const hasCropped = !!crop;
	const receiveCrop = (newCrop, newCropPrc) => {
		setCrop(newCropPrc);
	};
	const reset = () => {
		setCrop(notCropped);
	};
	
	const accept = () => {
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
			<Wrapper>
				<p>Click and drag frame across image and click OK to crop.</p>
				<ImageContainer>
					<ReactCrop src={props.src} crop={currentCrop} onChange={receiveCrop} />
				</ImageContainer>
				<FcnContainer>
					<Button round bordered danger onClick={cancel}><Icon icon="times" />Cancel</Button>
					<Button round bordered warn onClick={reset}><Icon icon="undo" />Reset</Button>
					<Button round bordered cta onClick={accept} disabled={!hasCropped}><Icon icon="check" />OK</Button>
				</FcnContainer>
			</Wrapper>
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

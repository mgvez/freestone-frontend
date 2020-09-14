import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import styled from 'styled-components';
import { useImageDimensions } from '../../hooks/imageDimensions';

import ReactCrop from 'react-image-crop';
import 'react-image-crop/lib/ReactCrop.scss';
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
	display: flex;
	justify-content: flex-end;

`;
const InfoContainer = styled.div`
	margin: 20px 0;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	.dimension {
		margin-left: 20px;
	}
`;

const notCropped = { unit: '%' };

const Cropper = (props) => {
	const [crop, setCrop] = useState(null);
	const [constrainRatio, setConstrainRatio] = useState(null);
	const currentCrop = crop || props.crop || notCropped;
	currentCrop.aspect = constrainRatio;
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

	const [naturalWidth, naturalHeight] = useImageDimensions(props.src);

	// console.log(pxCrop);
	let info;
	if (hasCropped && currentCrop.width) {
		const absWidth = (currentCrop.width * naturalWidth) / 100;
		const absHeight = (currentCrop.height * naturalHeight) / 100;
		const ratio = Math.round((absWidth / absHeight) * 100 + Number.EPSILON) / 100;
		info = (
			<div className="dimension">{Math.round(absWidth)}px * {Math.round(absHeight)}px, {ratio}:1 ratio</div>
		);
	}

	const onConstrain = () => {
		if (!constrainRatio) {
			setConstrainRatio(props.ratio);
			setCrop({
				...notCropped,
				...currentCrop,
				height: null,
			});
		} else {
			setConstrainRatio(null);
		}
	};

	let constrainBtn;
	if (props.ratio) {
		const label = constrainRatio ? 'Do not constrain ratio' : `Constrain to suggested ratio of ${props.ratio}:1`;
		constrainBtn = (<Button round bordered small onClick={onConstrain}>{label}</Button>);
	}

	return (
		<Modal
			isOpen
			onRequestClose={cancel}
			closeTimeoutMS={300}
			style={customStyle}
			ariaHideApp={false}
		>
			<Wrapper>
				<div>
					<p>Click and drag frame across image and click OK to crop.</p>
					
					<ImageContainer>
						<ReactCrop src={props.src} crop={currentCrop} onChange={receiveCrop} />
					</ImageContainer>
					<InfoContainer>
						{constrainBtn}
						{info}
					</InfoContainer>
					<FcnContainer>
						<Button round bordered danger onClick={cancel}><Icon icon="times" />Cancel</Button>
						<Button round bordered warn onClick={reset}><Icon icon="undo" />Reset</Button>
						<Button round bordered cta onClick={accept} disabled={!hasCropped}><Icon icon="check" />OK</Button>
					</FcnContainer>
				</div>
			</Wrapper>
		</Modal>
	);

};

Cropper.propTypes = {
	crop: PropTypes.object,
	ratio: PropTypes.number,
	src: PropTypes.string,
	setIsCropping: PropTypes.func,
	setCrop: PropTypes.func,
};

export default Cropper;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { WarningMessage } from '../../styles/Texts';


const RatioWarning = (props) => {
	
	if (!props.suggestedRatio || !props.imageWidth) return null;
	let ratio = props.imageWidth / props.imageHeight;

	if (props.crop && props.crop.width) {
		ratio = (props.imageWidth * props.crop.width / 100) / (props.imageHeight * props.crop.height / 100);
	}

	// is image ratio within the treshold of suggested ratio?
	if (Math.abs(ratio - props.suggestedRatio) < 0.1) return null;

	return (<WarningMessage>
		Image is not in the same ratio as the suggested ratio of {props.suggestedRatio}. Consider cropping the image.
	</WarningMessage>);

};

RatioWarning.propTypes = {
	suggestedRatio: PropTypes.number,
	imageWidth: PropTypes.number,
	imageHeight: PropTypes.number,
	crop: PropTypes.object,
};

export default RatioWarning;

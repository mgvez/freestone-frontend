import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { TYPE_FILE } from '../../freestone/schemaProps';
import { useImageDimensions } from '../../hooks/imageDimensions';
import { THUMBNAIL_SIZE, getProtocol } from '../../freestone/settings';

const Img = styled.img`
	max-height: ${THUMBNAIL_SIZE}px;
	display: block;
	margin: 0 auto;
	min-width: ${THUMBNAIL_SIZE / 2}px;
`;
const CroppedImg = styled.img`
	position: absolute;
	top: 0;
	left: 0;
	transform-origin: top left;
	max-width: none;
`;

const CheckeredBg = styled.span`
	background-color: #fff;
	width: 100%;
	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAIElEQVQoU2NkYGCQYsAEz9CFGIeIQix+wfQgyDODXSEANzEFjc0z43QAAAAASUVORK5CYII=);
`;

const FileLink = styled.a`
	height: ${THUMBNAIL_SIZE / 2}px;
	width: 100%;
	background-color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 3px;
	font-size: ${THUMBNAIL_SIZE / 8}px;
	font-weight: 600;
	color: black;
	padding: 1em;
`;

const ImgLink = styled.a`
	max-height: ${THUMBNAIL_SIZE}px;
	width: 100%;
	background-color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 3px;
	position: relative;
`;

const FileThumbnail = (props) => {
	
	function getLocalPath() {
		return `${props.env.filesDir}/${props.dir}/${props.val}`;
	}

	function getAbsolutePath(absolutePath) {
		if (!absolutePath) return null;
		if (absolutePath.indexOf('http') === 0) return absolutePath;
		if (absolutePath.indexOf('//') === 0) return getProtocol() + absolutePath;
		
		return getProtocol() + `${props.env.domain}${absolutePath}`;
	}

	// console.log(props.crop);
	if (!props.val && !props.localVal && !props.absolutePath) return null;
	const absolutePath = getAbsolutePath(props.absolutePath);
	const path = absolutePath || getLocalPath();
	if (props.type === TYPE_FILE) {
		const extMatch = props.val && props.val.match(/\.(.{2,5})$/);
		const ext = (extMatch && extMatch[1].toUpperCase()) || 'file';
		return props.val ? <FileLink href={path} target="_blank">{ext}</FileLink> : null;
	}
	//image
	//le thumbnail peut être un fichier local (quand on a pas encore savé) ou un thumbnail de l'admin
	let thumbVal = props.localVal || path;
	if (props.val) {
		const absoluteThumbPath = getAbsolutePath(props.thumbnailPath);
		// 2019-06-17: plus de thumbnails générés par l'admin pour les fichiers.
		thumbVal = absoluteThumbPath || path;
	}

	const [naturalWidth, naturalHeight] = useImageDimensions(thumbVal);

	const cropStyle = {};
	const imgCropStyle = {};
	let ImgComponent = Img;
	if (props.crop && props.crop.width && props.crop.height) {
		const absolute = {
			width: props.crop.width * naturalWidth * 0.01,
			height: props.crop.height * naturalHeight * 0.01,
			x: props.crop.x * naturalWidth * 0.01,
			y: props.crop.y * naturalHeight * 0.01,
		};
		const ratio = absolute.width / absolute.height;
		const maxSizeProp = `${THUMBNAIL_SIZE}px`;
		cropStyle.width = ratio > 1 ? maxSizeProp : `${THUMBNAIL_SIZE * ratio}px`;
		cropStyle.height = ratio > 1 ? `${THUMBNAIL_SIZE / ratio}px` : maxSizeProp;
		cropStyle.overflow = 'hidden';

		const sizeRatio = ratio > 1 ? THUMBNAIL_SIZE / absolute.width : THUMBNAIL_SIZE / absolute.height;
		imgCropStyle.width = `${naturalWidth}px`;
		imgCropStyle.height = `${naturalHeight}px`;
		imgCropStyle.left = `-${absolute.x * sizeRatio}px`;
		imgCropStyle.top = `-${absolute.y * sizeRatio}px`;

		ImgComponent = CroppedImg;
		imgCropStyle.transform = `scale(${sizeRatio})`;
	}
	console.log(thumbVal);
	return <ImgLink href={path} target="_blank" style={cropStyle}><CheckeredBg><ImgComponent src={thumbVal} style={imgCropStyle} /></CheckeredBg></ImgLink>;


};

FileThumbnail.propTypes = {
	env: PropTypes.object,
	crop: PropTypes.object,
	dir: PropTypes.string,
	val: PropTypes.string, //actual value in db of this file
	localVal: PropTypes.string, //image not yet uploaded, as an input's file value
	absolutePath: PropTypes.string,
	thumbnailPath: PropTypes.string,
	type: PropTypes.string,
};

export default FileThumbnail;

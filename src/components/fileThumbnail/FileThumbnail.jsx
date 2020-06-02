import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { TYPE_FILE } from '../../freestone/schemaProps';
import { THUMBNAIL_SIZE, getProtocol } from '../../freestone/settings';

const Img = styled.img`
	max-height: ${THUMBNAIL_SIZE}px;
	display: block;
	margin: 0 auto;
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
`;

export default class FileThumbnail extends Component {
	static propTypes = {
		env: PropTypes.object,
		dir: PropTypes.string,
		val: PropTypes.string, //actual value in db of this file
		localVal: PropTypes.string, //image not yet uploaded, as an input's file value
		absolutePath: PropTypes.string,
		thumbnailPath: PropTypes.string,
		type: PropTypes.string,
	};

	getLocalPath() {
		return `${this.props.env.filesDir}/${this.props.dir}/${this.props.val}`;
	}

	getAbsolutePath(absolutePath) {
		if (!absolutePath) return null;
		if (absolutePath.indexOf('http') === 0) return absolutePath;
		if (absolutePath.indexOf('//') === 0) return getProtocol() + absolutePath;
		
		return getProtocol() + `${this.props.env.domain}${absolutePath}`;
	}

	render() {

		if (!this.props.val && !this.props.localVal && !this.props.absolutePath) return null;
		const absolutePath = this.getAbsolutePath(this.props.absolutePath);
		const path = absolutePath || this.getLocalPath();

		if (this.props.type === TYPE_FILE) {
			const extMatch = this.props.val && this.props.val.match(/\.(.{2,5})$/);
			const ext = (extMatch && extMatch[1].toUpperCase()) || 'file';
			return this.props.val ? <FileLink href={path} target="_blank">{ext}</FileLink> : null;
		}
		//image
		//le thumbnail peut être un fichier local (quand on a pas encore savé) ou un thumbnail de l'admin
		let thumbVal = this.props.localVal;
		if (this.props.val) {
			const absoluteThumbPath = this.getAbsolutePath(this.props.thumbnailPath);
			// 2019-06-17: plus de thumbnails générés par l'admin pour les fichiers.
			thumbVal = absoluteThumbPath || path;
		}
		return <ImgLink href={path} target="_blank"><CheckeredBg><Img src={thumbVal} /></CheckeredBg></ImgLink>;

	}
}

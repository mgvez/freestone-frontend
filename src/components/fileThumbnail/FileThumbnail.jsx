import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TYPE_FILE } from '../../freestone/schemaProps';
import { THUMBNAIL_SIZE, getProtocol } from '../../freestone/settings';

const imgCss = {
	maxWidth: '100%',
	maxHeight: THUMBNAIL_SIZE,
};

const checkeredCss = {
	maxWidth: '90%',
	backgroundColor: '#fff',
	// backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAJElEQVQoU2OcO3euFAMaSE5OfoYuxjgUFKI7GsTH5m7GIaAQAH+WHcBbjpirAAAAAElFTkSuQmCC)',
	backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAIElEQVQoU2NkYGCQYsAEz9CFGIeIQix+wfQgyDODXSEANzEFjc0z43QAAAAASUVORK5CYII=)',
};

const fileLnkCss = {
	height: THUMBNAIL_SIZE / 2,
	width: '100%',
	backgroundColor: '#fff',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: '3px',
	fontSize: `${THUMBNAIL_SIZE / 8}px`,
	fontWeight: '600',
	color: 'black',
	padding: '1em',
};

const imgLnkCss = {
	height: THUMBNAIL_SIZE,
	width: '100%',
	backgroundColor: '#fff',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: '3px',
};

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

		let display;
		let lnkCss;

		if (this.props.type === TYPE_FILE) {
			const extMatch = this.props.val && this.props.val.match(/\.(.{2,5})$/);
			const ext = (extMatch && extMatch[1].toUpperCase()) || 'file';
			display = ext;
			lnkCss = fileLnkCss;
		} else {
			//image
			//le thumbnail peut être un fichier local (quand on a pas encore savé) ou un thumbnail de l'admin
			let thumbVal = this.props.localVal;
			// console.log(this.props);
			if (this.props.val) {
				const absoluteThumbPath = this.getAbsolutePath(this.props.thumbnailPath);
				thumbVal = absoluteThumbPath || `${this.props.env.thumbsDir}${this.props.dir}/${this.props.val}`;
			}
			display = <span style={checkeredCss}><img src={thumbVal} style={imgCss} /></span>;
			lnkCss = imgLnkCss;

		}
		const absolutePath = this.getAbsolutePath(this.props.absolutePath);		
		const path = absolutePath || this.getLocalPath();

		return <a href={path} target="_blank" style={lnkCss}>{display}</a>;

	}
}

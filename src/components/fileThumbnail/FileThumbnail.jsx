import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TYPE_FILE } from '../../freestone/schemaProps';
import { THUMBNAIL_SIZE, getProtocol } from '../../freestone/settings';

const css = {
	maxHeight: THUMBNAIL_SIZE,
	maxWidth: THUMBNAIL_SIZE,
};

export default class FileThumbnail extends Component {
	static propTypes = {
		env: PropTypes.object,
		dir: PropTypes.string,
		val: PropTypes.string,
		localVal: PropTypes.string,
		absolutePath: PropTypes.string,
		type: PropTypes.string,
	};

	getLocalPath() {
		return `${this.props.env.filesDir}/${this.props.dir}/${this.props.val}`;
	}

	render() {

		if (!this.props.val && !this.props.localVal && !this.props.absolutePath) return null;

		let display;
		if (this.props.type === TYPE_FILE) {
			display = this.props.val;
		} else {
			//image
			// console.log(this.props.absolutePath);
			const absolutePath = this.props.absolutePath && (this.props.absolutePath.indexOf('http') === 0 ? this.props.absolutePath : getProtocol() + this.props.absolutePath);
			//le thumbnail peut être un fichier local (quand on a pas encore savé) ou un thumbnail de l'admin
			const thumbVal = (this.props.val && (absolutePath || `${this.props.env.thumbsDir}${this.props.dir}/${this.props.val}`)) || this.props.localVal;
			display = <img src={thumbVal} style={css} />;
		}
		
		const path = this.props.absolutePath || this.getLocalPath();

		return <a href={path} target="_blank">{display}</a>;

	}
}

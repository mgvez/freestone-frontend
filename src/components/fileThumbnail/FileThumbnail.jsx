import React, { Component } from 'react';
import { connect } from 'react-redux';

import { TYPE_FILE } from '../../freestone/schemaProps';

const css = {
	maxHeight: 200,
	maxWidth: 200,
};

@connect(
	state => {
		return {
			env: state.freestone.env.freestone,
		};
	}
)
export class FileThumbnail extends Component {
	static propTypes = {
		env: React.PropTypes.object,
		dir: React.PropTypes.string,
		val: React.PropTypes.string,
		localVal: React.PropTypes.string,
		absolutePath: React.PropTypes.string,
		type: React.PropTypes.string,
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
			//le thumbnail peut être un fichier local (quand on a pas encore savé) ou un thumbnail de l'admin
			const thumbVal = (this.props.val && (this.props.absolutePath || `${this.props.env.thumbsDir}/${this.props.dir}/${this.props.val}`)) || this.props.localVal;
			display = <img src={thumbVal} style={css} />;
		}
		
		const path = this.props.absolutePath || this.getLocalPath();

		return <a href={path} target="_blank">{display}</a>;

	}
}

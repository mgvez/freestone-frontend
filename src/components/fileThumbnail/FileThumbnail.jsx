import React, { Component } from 'react';
import { connect } from 'react-redux';

import { TYPE_FILE } from '../../freestone/schemaProps';

@connect(
	state => {
		return {
			env: state.freestone.env,
		};
	}
)
export class FileThumbnail extends Component {
	static propTypes = {
		env: React.PropTypes.object,
		dir: React.PropTypes.string,
		val: React.PropTypes.string,
		localVal: React.PropTypes.string,
		type: React.PropTypes.string,
	};

	componentWillMount() {
		this.css = {
			maxHeight: 200,
			maxWidth: 200,
		};
	}


	render() {

		if (!this.props.val && !this.props.localVal) return null;

		let display;
		if (this.props.type === TYPE_FILE) {
			display = this.props.val;
		} else {
			//image
			//le thumbnail peut être un fichier local (quand on a pas encore savé) ou un thumbnail de l'admin
			const val = this.props.val ? `${this.props.env.thumbsDir}/${this.props.dir}/${this.props.val}` : this.props.localVal;
			display = <img src={val} style={this.css} />;
		}


		return <a href={`${this.props.env.filesDir}/${this.props.dir}/${this.props.val}`} target="_blank">{display}</a>;

	}
}

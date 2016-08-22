import React, { Component } from 'react';
import { connect } from 'react-redux';

import { TYPE_IMG, BANK_IMG_BG_LAYOUT } from 'freestone/schemaProps';


@connect(
	state => {
		return {
			env: state.env,
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
		
		const val = this.props.val ? `${this.props.env.thumbsDir}/${this.props.dir}/${this.props.val}` : this.props.localVal;

		let thumb = <div>view</div>;
		if (this.props.type === TYPE_IMG) {
			thumb = <img src={val} style={this.css} />;
		}

		let content = <a href={`${this.props.env.filesDir}/${this.props.dir}/${this.props.val}`} target="_blank">{thumb}</a>;
		if (this.props.type === BANK_IMG_BG_LAYOUT) {
			content = <div className="thumbnail-bg" style={{ backgroundImage: `url(${val})` }}></div>;
		}

		return content;
		
	}
}

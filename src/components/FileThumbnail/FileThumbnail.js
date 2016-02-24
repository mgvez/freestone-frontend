import React, { Component } from 'react';

export class FileThumbnail extends Component {
	static propTypes = {
		env: React.PropTypes.object,
		dir: React.PropTypes.string,
		val: React.PropTypes.string,
		type: React.PropTypes.string,
	};

	render() {

		if (!this.props.val) return null;
		
		let thumb = <div>view</div>;
		if (this.props.type === 'img') {
			thumb = <img src={`${this.props.env.thumbsDir}/${this.props.dir}/${this.props.val}`} />;
		}
		return (
			<a href={`${this.props.env.filesDir}/${this.props.dir}/${this.props.val}`} target="_blank">{thumb}</a>
		);
		
	}
}

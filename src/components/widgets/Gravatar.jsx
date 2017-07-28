import React, { Component } from 'react';
import md5 from 'md5';

const DEFAULT_SIZE = 75;

export class Gravatar extends Component {
	static propTypes = {
		email: React.PropTypes.string,
		picture: React.PropTypes.string,
		size: React.PropTypes.number,
	};

	render() {
		// console.log(this.props);
		// console.log(window.devicePixelRatio);
		//default sur picture qui peut etre passée dans le user (si par ex. loggé par google)
		const size = this.props.size || DEFAULT_SIZE;

		let src = this.props.picture;
		if (!src) {
			const hash = md5(this.props.email || '');
			const base = (window.location.protocol === 'https:' ? 'https://secure.' : 'http://www.') + 'gravatar.com/avatar/';
			const querySize = size * (window.devicePixelRatio > 1 ? 2 : 1);

			src = `${base}${hash}?s=${querySize}&d=identicon`;
		}
		return (
			<img
				src={src}
				height={size}
				width={size}
			/>
		);
	}
}

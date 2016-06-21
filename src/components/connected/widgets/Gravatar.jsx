import React, { Component } from 'react';
import { connect } from 'react-redux';

@connect(
	state => { return { email: state.auth.email, hash: state.auth.emailHash }; },
)
export class Gravatar extends Component {
	static propTypes = {
		email: React.PropTypes.string,
		hash: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		
	}

	render() {
		console.log(this.props);
		console.log(window.devicePixelRatio);
		// "https://secure.gravatar.com/avatar/"
		const base = 'http://www.gravatar.com/avatar/';
		const src = `${base}${this.props.hash}`;
		return (
			<img
				src={src}
				height={75}
				width={75}
			/>
		);
	}
}

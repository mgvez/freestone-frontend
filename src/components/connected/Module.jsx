import React, { Component } from 'react';
import { connect } from 'react-redux';

import DocumentMeta from 'react-document-meta';
import { getApiUrl } from 'freestone/api';


const metaData = {
	title: 'Module',
	description: 'Freestone Admin',
	meta: {
		charset: 'utf-8',
	},
};

@connect(
	state => { return { jwt: state.auth.jwt }; }
)
export class Module extends Component {
	static propTypes = {
		params: React.PropTypes.shape({
			url: React.PropTypes.string,
		}),
		jwt: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
	}

	render() {
		// console.log(this.props);
		const host = getApiUrl();
		const url = `${host}/module/${this.props.params.url}?jwt=${this.props.jwt}`;
		return (
			<section>
				<DocumentMeta {...metaData} />
					<h1>
						{this.props.params.url}
					</h1>
					<iframe className="module" src={url} />
			</section>
		);
	}
}

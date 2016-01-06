import React, { Component } from 'react';
import { connect } from 'react-redux';

import DocumentMeta from 'react-document-meta';

const metaData = {
	title: 'Redux test',
	description: 'Start you project easy and fast with modern tools.',
	canonical: 'http://example.com/path/to/page',
	meta: {
		charset: 'utf-8',
	},
};

@connect(
	state => state.freestone,
)
export class List extends Component {
	static propTypes = {
		params: React.PropTypes.object,
	}

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<section>
				<DocumentMeta {...metaData} />
				<h1>List records from {this.props.params.name}</h1>
			</section>
		);
	}
}

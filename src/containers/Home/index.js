import React, { Component } from 'react';
import { connect } from 'react-redux';

import DocumentMeta from 'react-document-meta';


const metaData = {
	title: 'Freestone Home',
	description: 'Freestone Admin',
	meta: {
		charset: 'utf-8',
	},
};

@connect(
	state => state,
)
export class Home extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		// console.log(this.props);
		return (
			<section>
				<DocumentMeta {...metaData} />
					<h1>
						Home sweet home
					</h1>
			</section>
		);
	}
}

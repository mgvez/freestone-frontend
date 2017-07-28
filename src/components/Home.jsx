import React, { Component } from 'react';
import { connect } from 'react-redux';

import DocumentMeta from 'react-document-meta';

import { GoogleAnalytics } from './dashboard/GoogleAnalytics';
import { Shortcuts } from './dashboard/Shortcuts';

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

	render() {
		// console.log(this.props);
		return (
			<section>
				<DocumentMeta {...metaData} />
				<GoogleAnalytics />
				<Shortcuts />
			</section>
		);
	}
}

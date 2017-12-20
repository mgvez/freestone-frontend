import React, { Component } from 'react';

import DocumentMeta from 'react-document-meta';

import GoogleAnalytics from '../containers/dashboard/GoogleAnalytics';
import Shortcuts from '../containers/dashboard/Shortcuts';

const metaData = {
	title: 'Freestone Home',
	description: 'Freestone Admin',
	meta: {
		charset: 'utf-8',
	},
};

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

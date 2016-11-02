import React, { Component } from 'react';
import { connect } from 'react-redux';

import DocumentMeta from 'react-document-meta';
import { getApiUrl } from 'freestone/api';
import { pageSelector } from 'selectors/page';

import { getWebsiteUrl } from 'freestone/settings';

const metaData = {
	title: 'Page',
	description: 'Freestone Admin',
	meta: {
		charset: 'utf-8',
	},
};

@connect(
	pageSelector
)
export class Page extends Component {
	static propTypes = {
		params: React.PropTypes.shape({
			id: React.PropTypes.string,
		}),
		title: React.PropTypes.string,
		jwt: React.PropTypes.string,
	};

	render() {
		// console.log(this.props);
		const host = getWebsiteUrl();
		const url = `${host}/adminpage/?t=zva_admin_page&i=${this.props.params.id}&jwt=${this.props.jwt}`;
		metaData.title = this.props.title;
		return (
			<section>
				<DocumentMeta {...metaData} />
				<iframe className="page" src={url} style={{ width: '100%', minHeight: '100vh' }} />
			</section>
		);
	}
}

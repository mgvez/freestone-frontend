import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentMeta from 'react-document-meta';

import uniqueId from '../utils/UniqueId';

import { getWebsiteUrl } from '../freestone/settings';

const metaData = {
	title: 'Page',
	description: 'Freestone Admin',
	meta: {
		charset: 'utf-8',
	},
};

export default class Page extends Component {
	static propTypes = {
		resolvedUrl: PropTypes.string,
		title: PropTypes.string,
		jwt: PropTypes.string,
		id: PropTypes.number,

		rememberListPage: PropTypes.func,
		setPageHash: PropTypes.func,
		goTo: PropTypes.func,
		lockScroll: PropTypes.func,
		duplicateRecord: PropTypes.func,

	};

	componentDidMount() {
		window.addEventListener('message', this.receiveEditCommand, false);
	}

	componentWillUnmount() {
		window.removeEventListener('message', this.receiveEditCommand);
	}

	receiveEditCommand = (message) => {
		// console.log(message.data);
		if (message.data && message.data.command) {
			const { tableName, backUrl } = message.data;
			let recordId;
			if (message.data.command === 'edit' || message.data.command === 'duplicate') {
				recordId = message.data.recordId;
			} else if (message.data.command === 'newrec') {
				recordId = uniqueId();
			}
			// console.log(tableName, recordId, backUrl);

			const hash = `__${this.props.id}`;
			this.props.setPageHash(hash, this.props.id, backUrl);
			this.props.rememberListPage(tableName, recordId, `page/${hash}`);
			if (message.data.command === 'duplicate') {
				this.props.duplicateRecord(tableName, recordId);
			} else {
				this.props.goTo(`/edit/${tableName}/${recordId}`);
			}
		}
	}

	render() {
		// console.log(this.props.resolvedUrl);
		const host = getWebsiteUrl();
		const url = this.props.resolvedUrl || `${host}/adminpage/?t=zva_admin_page&i=${this.props.id}&jwt=${this.props.jwt}`;
		metaData.title = this.props.title;
		return (
			<section>
				<DocumentMeta {...metaData} />
				<iframe className="page" src={url} style={{ width: '100%', minHeight: '100vh' }} />
			</section>
		);
	}
}

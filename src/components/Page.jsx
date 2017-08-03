import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DocumentMeta from 'react-document-meta';

import { pageSelector } from '../selectors/page';
import uniqueId from '../utils/UniqueId';
import { lockScroll, rememberListPage, goTo, setPageHash } from '../actions/nav';
import { duplicateRecord } from '../actions/record';

import { getWebsiteUrl } from '../freestone/settings';

const metaData = {
	title: 'Page',
	description: 'Freestone Admin',
	meta: {
		charset: 'utf-8',
	},
};

@connect(
	pageSelector,
	dispatch => bindActionCreators({ goTo, lockScroll, rememberListPage, setPageHash, duplicateRecord }, dispatch)
)
export class Page extends Component {
	static propTypes = {
		params: React.PropTypes.shape({
			id: React.PropTypes.string,
		}),
		resolvedUrl: React.PropTypes.string,
		title: React.PropTypes.string,
		jwt: React.PropTypes.string,
		id: React.PropTypes.number,

		rememberListPage: React.PropTypes.func,
		setPageHash: React.PropTypes.func,
		goTo: React.PropTypes.func,
		lockScroll: React.PropTypes.func,
		duplicateRecord: React.PropTypes.func,

	};

	componentWillMount() {
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
		const url = this.props.resolvedUrl || `${host}/adminpage/?t=zva_admin_page&i=${this.props.params.id}&jwt=${this.props.jwt}`;
		metaData.title = this.props.title;
		return (
			<section>
				<DocumentMeta {...metaData} />
				<iframe className="page" src={url} style={{ width: '100%', minHeight: '100vh' }} />
			</section>
		);
	}
}
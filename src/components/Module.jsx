import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentMeta from 'react-document-meta';
import { getAdminUrl } from '../freestone/api';
import { Header, HeaderTexts } from '../styles/Header';
import { Heading1 } from '../styles/Texts';

const metaData = {
	title: 'Module',
	description: 'Freestone Admin',
	meta: {
		charset: 'utf-8',
	},
};

export default class Module extends Component {
	static propTypes = {
		url: PropTypes.string,
		label: PropTypes.string,
		description: PropTypes.string,
		jwt: PropTypes.string,
	};

	shouldComponentUpdate(props) {
		return this.props.url !== props.url;
	}
	
	render() {
		const host = getAdminUrl();
		//adds a time to get to prevent over-aggressive server cache (I'm looking at you Radio-Canada)
		const time = (new Date()).getMilliseconds();
		// console.log('module', time);
		const url = `${host}module/${this.props.url}/?jwt=${this.props.jwt}&nocache=${time}`;
		return (
			<section>
				<DocumentMeta {...metaData} />
				<Header>
					<HeaderTexts>
						<Heading1>{this.props.label}</Heading1>
						<p>{this.props.description}</p>
					</HeaderTexts>
				</Header>
				<iframe className="module" src={url} style={{ width: '100%', minHeight: '100vh' }} />
			</section>
		);
	}
}

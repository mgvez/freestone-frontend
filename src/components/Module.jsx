import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentMeta from 'react-document-meta';
import { getAdminUrl } from '../freestone/api';

const metaData = {
	title: 'Module',
	description: 'Freestone Admin',
	meta: {
		charset: 'utf-8',
	},
};

export default class Module extends Component {
	static propTypes = {
		params: PropTypes.shape({
			url: PropTypes.string,
		}),
		label: PropTypes.string,
		description: PropTypes.string,
		jwt: PropTypes.string,
	};

	shouldComponentRender(props) {
		return this.props.params && props.params && this.props.params.url !== props.params.url;
	}
	
	render() {
		const host = getAdminUrl();
		//adds a time to get to prevent over-aggressive server cache (I'm looking at you Radio-Canada)
		const time = (new Date()).getMilliseconds();
		const url = `${host}module/${this.props.params.url}/?jwt=${this.props.jwt}&nocache=${time}`;
		return (
			<section>
				<DocumentMeta {...metaData} />
				<header className="module-header">
					<div className="texts">
						<h1>{this.props.label}</h1>
						<p>{this.props.description}</p>
					</div>
				</header>
				<iframe className="module" src={url} style={{ width: '100%', minHeight: '100vh' }} />
			</section>
		);
	}
}

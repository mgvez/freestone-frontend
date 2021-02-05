import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentMeta from 'react-document-meta';
import { makeCancelable } from '../utils/CancellablePromise';
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
		pingAuth: PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.state = {
			pinged: false,
		};
	}

	componentDidMount() {
		this.pingPromise = makeCancelable(
			this.props.pingAuth()
		);
		this.pingPromise.promise.then(() => {
			this.setState({
				pigned: true,
			});
		}).catch(() => { });
	}

	componentWillUnmount() {
		this.pingPromise.cancel();
	}

	shouldComponentUpdate(props, state) {
		// console.log(this.props.url, props.url, this.state.pigned, state.pigned);
		const isSameUrl = this.props.url === props.url;
		const isSamePing = this.state.pigned === state.pigned;
		return !isSameUrl || !isSamePing;
	}
	
	render() {

		if (!this.state.pigned) return null;

		const host = getAdminUrl();
		//adds a time to get to prevent over-aggressive server cache (I'm looking at you Radio-Canada)
		const time = (new Date()).getMilliseconds();
		// console.log('module', time);
		const url = `${host}module/${this.props.url}/?jwt=${this.props.jwt}&nocache=${time}`;
		return (
			<section style={{ backgroundColor: 'white' }}>
				<DocumentMeta {...metaData} />
				<Header>
					<HeaderTexts>
						<Heading1>{this.props.label}</Heading1>
						<p>{this.props.description}</p>
					</HeaderTexts>
				</Header>
				<iframe className="module" src={url} style={{ width: '90%', minHeight: '100vh', marginLeft: '5%', marginTop: '50px' }} />
			</section>
		);
	}
}

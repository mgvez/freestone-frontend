import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import { getWebsiteUrl, PLACEHOLDER } from '../../../freestone/settings';
import customStyle from '../../../styles/Modal.js';
import { Button } from '../../../styles/Button';
import { GridContainer, GridItem } from '../../../styles/Grid';

function buildlink(contents, link, linkLabel, linkTarget) {
	let val = link.trim();
	
	// console.log(val, !!~val.indexOf('{lnk'), !!~val.indexOf('//'));

	if (!~val.indexOf('mailto:') && !~val.indexOf('//') && !~val.indexOf('{lnk')) {
		val = `//${val}`;
	}
	
	// console.log(val);

	if (linkLabel) {
		// If linking on a Bank image
		if (linkLabel.indexOf('<figure') === 0) {
			const tags = linkLabel.match(/<\/?\w+((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[\^'">\s]+))?)+\s*|\s*)\/?>/g); // Array de tags HTML
			val = tags[0] + `<a href=${val} target=${linkTarget}>${tags[1]}</a>` + tags[2];
		} else {
			val = `<a href="${val}" target="${linkTarget}">${linkLabel}</a>`;
		}
	}

	if (contents && ~contents.indexOf(PLACEHOLDER)) {
		val = contents.replace(PLACEHOLDER, val);
	}
	// console.log(val);
	return val;
}

let internalUrl;
function receiveUrl(event) {
	// console.log(event.data);
	internalUrl = (event.data && event.data.currentLink) || internalUrl;
}

export default class LinkInsert extends Component {
	static propTypes = {
		onClose: PropTypes.func,
		setVal: PropTypes.func,
		contentBefore: PropTypes.string,
		contentAfter: PropTypes.string,
		selection: PropTypes.string,
		link: PropTypes.string,
		//indique si on veut un link <a href...> ou juste une url
		isUrlOnly: PropTypes.bool,
		lang: PropTypes.string,
	};

	componentDidMount() {
		window.addEventListener('message', receiveUrl, false);
	}

	componentWillUnMount() {
		window.removeEventListener('message', receiveUrl);
	}

	afterOpenModal = () => {
		// references are now sync'd and can be accessed.
		// this.refs.subtitle.style.color = '#f00';
	};

	selectInternal = () => {
		try {
			const ifr = this.refs.ifr;
			const link = internalUrl || ifr.contentWindow.location.href;
			// console.log(link);
			this.props.setVal(buildlink(
				this.props.contentAfter,
				link,
				this.props.isUrlOnly ? null : (this.refs.linkLabel && this.refs.linkLabel.value) || 'link',
				'_self'
			));
			this.closeModal();
		} catch (e) {
			console.log(e);// eslint-disable-line
			alert('Cross domain error. If you want to link to an external site, please paste the link in the external link input');// eslint-disable-line
		}
	};

	selectExternal = () => {
		this.props.setVal(buildlink(
			this.props.contentAfter,
			this.refs.linkExternal.value,
			this.props.isUrlOnly ? null : (this.refs.linkLabel && this.refs.linkLabel.value) || 'link',
			'_blank'
		));
		this.closeModal();
	};

	cancelChange = () => {
		this.props.setVal(this.props.contentBefore);
		this.closeModal();
	};

	closeModal = () => {
		this.props.onClose();
	};

	render() {
		const n = 300;

		const labelInput = this.props.isUrlOnly ? null : <p>link label: <input defaultValue={this.props.selection} ref="linkLabel" /></p>;
		const lang = this.props.lang || '';
		return (
			<Modal
				isOpen
				onAfterOpen={this.afterOpenModal}
				onRequestClose={this.cancelChange}
				closeTimeoutMS={n}
				style={customStyle}
			>
				<GridContainer>
					<GridItem columns="6">
						{labelInput}
					</GridItem>
					<GridItem columns="6">
						<Button round danger onClick={this.cancelChange}>cancel</Button>
					</GridItem>
					<GridItem columns="6">
						<h4>Internal Link</h4>
						<p>If you want to link to a page in your website, in the window below navigate to the page where the link is to point to, and then click the following button.</p>
						<Button round bordered onClick={this.selectInternal}>use page below</Button>
					</GridItem>
					<GridItem columns="6">
						<h4>External Link</h4>
						<p>If you want to link to a page anywhere on the web, please paste its url in the box and click on the submit button.</p>
						<p><input type="text" ref="linkExternal" className="bordered" defaultValue={this.props.link} /></p>
						<Button round bordered onClick={this.selectExternal}>use this url</Button>
					</GridItem>
				</GridContainer>
				<iframe src={getWebsiteUrl() + lang} style={{ width: '100%', height: '500px' }} ref="ifr" />
			</Modal>
		);
	}
}

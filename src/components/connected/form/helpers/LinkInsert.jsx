import React, { Component } from 'react';

import { getWebsiteUrl } from 'freestone/settings';
import Modal from 'react-modal';
import customStyle from 'components/styles/modalStyles.js';

function buildlink(contents, link, linkLabel, linkTarget) {
	let val = link.trim();
	
	// console.log(val, !!~val.indexOf('{lnk'), !!~val.indexOf('//'));

	if (!~val.indexOf('//') && !~val.indexOf('{lnk')) {
		val = `//${val}`;
	}
	
	// console.log(val);
	if (linkLabel) {
		val = `<a href="${val}" target="${linkTarget}">${linkLabel}</a>`;
	}

	if (contents && ~contents.indexOf('{{placeholder}}')) {
		val = contents.replace('{{placeholder}}', val);
	}
	// console.log(val);
	return val;
}

let internalUrl;
function receiveUrl(event) {
	// console.log(event.data);
	internalUrl = event.data;
}

export class LinkInsert extends Component {
	static propTypes = {
		onClose: React.PropTypes.func,
		setVal: React.PropTypes.func,
		contentBefore: React.PropTypes.string,
		contentAfter: React.PropTypes.string,
		selection: React.PropTypes.string,
		//indique si on veut un link <a href...> ou juste une url
		isUrlOnly: React.PropTypes.bool,
	};

	componentWillMount() {
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
			console.log(e);
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

		return (
			<Modal
				isOpen
				onAfterOpen={this.afterOpenModal}
				onRequestClose={this.cancelChange}
				closeTimeoutMS={n}
				style={customStyle}
			>
				<section className="container url-modal">
					<div className="row">
						<div className="col-md-6">
							{labelInput}
						</div>
						<div className="col-md-6 url-modal-cancel">
							<button className="button-round-danger" onClick={this.cancelChange}>cancel</button>
						</div>
					</div>
					<div className="row">
						<div className="col-md-6">
							<h4>Internal Link</h4>
							<p>If you want to link to a page in your website, in the window below navigate to the page where the link is to point to, and then click the following button.</p>
							<button className="button-round-action-bordered" onClick={this.selectInternal}>use page below</button>
						</div>
						<div className="col-md-6">
							<h4>External Link</h4>
							<p>If you want to link to a page anywhere on the web, please paste its url in the box and click on the submit button.</p>
							<p><input type="text" ref="linkExternal" className="bordered" /></p>
							<button className="button-round-action-bordered" onClick={this.selectExternal}>use this url</button>
						</div>
					</div>
				</section>
				<iframe src={getWebsiteUrl()} style={{ width: '100%', height: '500px' }} ref="ifr" />
			</Modal>
		);
	}
}

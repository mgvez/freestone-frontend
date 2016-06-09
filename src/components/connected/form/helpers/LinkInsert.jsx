import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getWebsiteUrl } from 'freestone/settings';
import Modal from 'react-modal';


const customStyle = {
	overlay: {
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(255, 255, 255, 0.75)',
		zIndex: 3000,
	},
	content: {
		position: 'absolute',
		top: '40px',
		left: '40px',
		right: '40px',
		bottom: '40px',
		border: '1px solid #ccc',
		background: '#fff',
		overflow: 'auto',
		WebkitOverflowScrolling: 'touch',
		borderRadius: '4px',
		outline: 'none',
		padding: '20px',
	},
};

function buildlink(contents, link, linkLabel) {
	let val = link.trim();

	// console.log(val, !!~val.indexOf('{lnk'), !!~val.indexOf('//'));
	if (!~val.indexOf('{lnk') && !~val.indexOf('//')) {
		val = `//${val}`;
	}
	// console.log(val);
	if (linkLabel) {
		val = `<a href="${val}">${linkLabel}</a>`;
	}

	if (contents) {
		val = contents.replace('{{link}}', val);
	}

	return val;
}

export class LinkInsert extends Component {
	static propTypes = {
		onClose: React.PropTypes.func,
		setVal: React.PropTypes.func,
		contentBefore: React.PropTypes.string,
		contentAfter: React.PropTypes.string,
		selection: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
		console.log(props);
	}

	openModal = () => {
		this.setState({ modalIsOpen: true });
	};

	afterOpenModal = () => {
		// references are now sync'd and can be accessed.
		// this.refs.subtitle.style.color = '#f00';
	};

	selectInternal = () => {
		const linkLabel = this.refs.linkLabel.value;
		
		try {
			const ifr = this.refs.ifr;
			const link = ifr.contentWindow.location.href;
			this.props.setVal(buildlink(
				this.props.contentAfter,
				link,
				this.refs.linkLabel.value || 'link'
			));
			this.closeModal();
		} catch (e) {
			alert('Cross domain error. If you want to link to an external site, please paste the link in the external link input');
		}		
	};

	selectExternal = () => {

		this.props.setVal(buildlink(
			this.props.contentAfter,
			this.refs.linkExternal.value,
			this.refs.linkLabel.value || 'link'
		));
		this.closeModal();
	};

	cancelChange = () => {
		this.props.setVal(this.props.contentBefore);
		this.closeModal();
	};

	closeModal = () => {
		this.setState({ modalIsOpen: false });
		this.props.onClose();
	};

	render() {
		const n = 300;
		return (
			<Modal
				isOpen
				onAfterOpen={this.afterOpenModal}
				onRequestClose={this.closeModal}
				closeTimeoutMS={n}
				style={customStyle}
			>
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<button onClick={this.cancelChange}>cancel</button>
							<p>link label: <input defaultValue={this.props.selection} ref="linkLabel" /></p>
						</div>
					</div>
					<div className="row">
						<div className="col-md-6">
							<h4>Internal Link selector</h4>
							<p>If you want to link to a page in your website, in the window below navigate to the page where the link is to point to, and then click the "select" button.</p>
							<button onClick={this.selectInternal}>use page below</button>
						</div>
						<div className="col-md-6">
							<h4>External Link</h4>
							<p>If you want to link to a page anywhere on the web, please paste its url in the box and click on the submit button.</p>
							<p>external url: <input ref="linkExternal" /></p>
							<button onClick={this.selectExternal}>use this link</button>

						</div>
					</div>
				</div>
				<iframe src={getWebsiteUrl()} style={{ width: '100%', height: '500px' }} ref="ifr"/>
			</Modal>
		);
	}
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { getWebsiteUrl, PLACEHOLDER } from '../../../freestone/settings';
import url_helper from '../../../styles/Modal.js';
import { Button } from '../../../styles/Button';
import { GridContainer, GridItem } from '../../../styles/Grid';

function buildlink(contents, link, linkLabel, linkTarget) {
	let val = link.trim();

	if (!~val.indexOf('mailto:') && !~val.indexOf('//') && !~val.indexOf('{lnk')) {
		val = `//${val}`;
	}

	if (linkLabel) {
		val = `<a href="${val}" target="${linkTarget}">${linkLabel}</a>`;
	}

	let newContents = val;
	if (contents && ~contents.indexOf(PLACEHOLDER)) {
		newContents = contents.replace(PLACEHOLDER, val);
	}

	return newContents;
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

		const title_styles = {
			margin: '17px 0 10px 0',	
			'font-weight': 'bold',
		}

		const p_styles = {
			margin: '0 0 15px 0',
			'line-height': '1.2',
		}

		const left_p_styles = {
			display: 'inline-block',
			'line-height': '1.2',
			width: '70%',
		}

		const grid_ctn_styles = {
			position: 'absolute',
			'margin-top': '-12px',
			'background-color': 'white',
			'box-shadow': '0px 13px 36px -39px rgb(0 0 0 / 75%)',
			width: 'calc(100% - 40px)',
		}

	

		return (
			<Modal
				isOpen
				ariaHideApp={false}
				onAfterOpen={this.afterOpenModal}
				onRequestClose={this.cancelChange}
				closeTimeoutMS={n}
				style={url_helper}
			>
	
				<GridContainer style={grid_ctn_styles}>
					<GridItem columns="12">
						{labelInput}
					</GridItem>
					<GridItem columns="5" style={{ margin: '0 10px 25px 0', padding: '0 15px 15px 15px', 'background-color' : '#e7eaec' }}>
						<h4 style={title_styles}>Internal Link</h4>
						<div>
							<p style={left_p_styles}> If you want to link to a page in your website, in the window below navigate to the page where the link is to point to, and then click the following button.</p>
							<Button style={{ 'vertical-align': 'top', 'margin-left': '10px' }} bordered="true" onClick={this.selectInternal}>use page below</Button>
						</div>
					</GridItem>
					<GridItem columns="6" style={{ margin: '0 0 25px 0'  }}>
						<h4 style={title_styles}>External Link</h4>
						<p style={p_styles}>If you want to link to a page anywhere on the web, please paste its url in the box and click on the submit button.</p>
						<div>
							<input type="text" ref="linkExternal" style={{ 'border-color': 'rgba(0,0,0,0)', width: '70%', height: '30px', 'background-color' : '#e7eaec' }} defaultValue={this.props.link} />
							<Button style={{ 'margin-top': '-3px', 'margin-left':'15px' }} onClick={this.selectExternal}>use this url</Button>
						</div>
					</GridItem>
					<GridItem columns="1" style={{'text-align': 'right'}}>
						<Button round="true" danger="true" onClick={this.cancelChange}>cancel</Button>
					</GridItem>
				</GridContainer>
				<iframe src={getWebsiteUrl() + lang} style={{ width: '100%', height: '100%', 'padding-top': '140px' }} ref="ifr" />
			</Modal>
		);
	}
}

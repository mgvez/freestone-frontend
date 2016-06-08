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

/*

frm.on('submit.freestone', function(){

			if (frm.find('#linkText').val() == '') {
				alert('Svp entrer un texte sur lequel se fera le lien.');
				return false;
			}
			//is there a freestone link?
			var lnk = ifr.contents().find('body').data('freestonelink');
			if(lnk) {
				lnk = '{' + lnk + '}';
			} else {
				//no freestone link, use page location
				lnk = ifr.contents().get(0).location.href ;
			}

			var html = '<a href="' + lnk + '">' + frm.find('#linkText').val() + '</a>';

			tinyMCEPopup.editor.execCommand('mceInsertContent', false, html);
			tinyMCEPopup.close();
			return false;

		}); */
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

	selectLink = () => {
		// this.props.setVal(this.props.contentBefore);
		
		const linkLabel = this.refs.linkLabel.value;
		const ifr = this.refs.ifr;
		const link = ifr.contentWindow.location.href;
		const val = this.props.contentAfter.replace('{{link}}', `<a href="${link}">${linkLabel}</a>`);
		this.props.setVal(val);
		console.log(val);
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
				<button onClick={this.cancelChange}>cancel</button>
				<button onClick={this.selectLink}>select</button>
				<h1>{getWebsiteUrl()}</h1>
				label: <input defaultValue={this.props.selection} ref="linkLabel" />
				<iframe src="http://bixi.freestone" style={{ width: '100%', height: '500px' }} ref="ifr"/>
			</Modal>
		);
	}
}

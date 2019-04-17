import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { PREVIEW_IFRAME, PREVIEW_WIN } from '../../actions/record';
import { accentPrimary, backgroundMain } from '../styles/variables';
import SaveLivePreview from '../../containers/process/SaveLivePreview';

const ContainerDiv = styled.div `
	font-weight: 600;
	text-transform: uppercase;
	margin-left: 20px;
`;

const Tab = styled.div `
	cursor: pointer;
	display: inline-block;
	vertical-align: middle;
	color: ${accentPrimary};
	background: ${backgroundMain};
	height: 30px;
	line-height: 30px;
	padding: 0 20px;
	border: 1px solid ${accentPrimary};
	border-left: 0;
	transition: background 0.3s, color 0.3s;
	font-size: 10px;
	&:last-child {
		border-radius: 0 0 10px 0;
	}
	&:first-child {
		border-left: 1px solid ${accentPrimary};
		border-radius: 0 0 0 10px;
	}

	&:hover, &.active {
		background: ${accentPrimary};
		color: white;
	}
`;

// const TabActive =

export default class PreviewRecord extends Component {
	static propTypes = {
		slug: PropTypes.string,
		tableId: PropTypes.number,
		recordId: PropTypes.string,
		previewRecordId: PropTypes.number,
		lastEdit: PropTypes.number,
		isPreviewEdited: PropTypes.bool,
		isViewingPreview: PropTypes.bool,
		isPreviewInited: PropTypes.bool,
		currentPreviewType: PropTypes.string,
		currentLanguage: PropTypes.string,

		setIsPreviewing: PropTypes.func,
		setCurrentPreview: PropTypes.func,
		setPreviewViewType: PropTypes.func,
	};

	constructor(props) {
		super(props);

		this.state = {
			sendingChanges: false,
		};
	}

	componentWillReceiveProps(props) {
		// console.log('props received ' + this.props.lastEdit, props.isPreviewEdited);
		if (props.isPreviewEdited && this.props.isViewingPreview) {
			if (this.timeoutId) {
				// console.log('clear ' + this.timeoutId);
				clearTimeout(this.timeoutId);
			}
			this.timeoutId = setTimeout(this.sendChanges, 1200);
		}
	}

	componentWillUnmount() {
		// console.log('unmounting');
		clearTimeout(this.timeoutId);
		this.props.setCurrentPreview();
	}

	sendChanges = () => {
		// console.log('sending preview');
		this.setState({
			sendingChanges: true,
		});
	}

	cancelSave = () => {
		// console.log('cancel');
		this.setState({
			sendingChanges: false,
		});
	}

	onClickPreview = () => {
		this.props.setIsPreviewing(this.props.tableId, this.props.recordId, true);
		this.props.setCurrentPreview(this.props.tableId, this.props.recordId);
	}

	onClickClose = () => {
		this.props.setIsPreviewing(this.props.tableId, this.props.recordId, false);
		this.props.setCurrentPreview(null, null);
	}

	onClickIframe = () => {
		this.props.setPreviewViewType(PREVIEW_IFRAME);
	}
	onClickWindow = () => {
		this.props.setPreviewViewType(PREVIEW_WIN);
	}

	render() {

		if (!this.props.isViewingPreview) return (<button className="button-preview" onClick={this.onClickPreview}><i className="fa fa-eye"></i>Preview</button>);

		// console.log(this.props);
		//on load, save total record as draft
		let msg = 'x';
		
		//only send updated data
		if (this.state.sendingChanges || !this.props.previewRecordId) {
			msg = <SaveLivePreview tableId={this.props.tableId} recordId={this.props.recordId} />;
		} 
		return (<ContainerDiv>
			<Tab onClick={this.onClickClose}>{msg}</Tab>
			<Tab onClick={this.onClickIframe} className={this.props.currentPreviewType === PREVIEW_IFRAME ? 'active' : null}>ifr</Tab>
			<Tab onClick={this.onClickWindow} className={this.props.currentPreviewType === PREVIEW_WIN ? 'active' : null}>win</Tab>
		</ContainerDiv>);

	}
}

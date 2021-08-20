import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { PREVIEW_IFRAME, PREVIEW_WIN } from '../../actions/preview';
import colors from '../../styles/Colors';
import SaveLivePreview from '../../containers/process/SaveLivePreview';
import { Button } from '../../styles/Button';
import { Icon } from '../../styles/Icon';
import { darken } from '../../styles/Utils';

const ContainerDiv = styled.div `
	font-weight: 600;
	text-transform: uppercase;
	margin-left: 20px;
`;

const Tab = styled.div `
	cursor: pointer;
	display: inline-block;
	vertical-align: middle;
	color: ${colors.accentPrimary};
	background: ${colors.backgroundMain};
	height: 30px;
	line-height: 30px;
	padding: 0 20px;
	border: 1px solid ${colors.accentPrimary};
	border-left: 0;
	transition: background 0.3s, color 0.3s;
	font-size: 10px;

	&:first-child {
		border-left: 1px solid ${colors.accentPrimary};
	}

	&:hover, &.active {
		background: ${colors.accentPrimary};
		color: white;
	}

	&:hover {
		background: ${darken(colors.accentPrimary, 0.2)};
	}
`;

export default class PreviewRecord extends Component {
	static propTypes = {
		slug: PropTypes.string,
		tableId: PropTypes.number,
		recordId: PropTypes.string,
		previewRecordId: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
		]),
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

	componentDidUpdate() {
		// console.log(this.props.isPreviewEdited, this.props.isViewingPreview, !this.state.sendingChanges);
		if (this.props.isPreviewEdited && this.props.isViewingPreview && !this.state.sendingChanges) {
			clearTimeout(this.timeoutId);
			this.timeoutId = setTimeout(this.sendChanges, 1200);
		}
	}

	//when mounting, we verify if this record was previewing (which might be the case if we went to a bank choose and come back to form)
	componentDidMount() {
		if (this.props.isViewingPreview) {
			this.props.setIsPreviewing(true);
		}
	}

	componentWillUnmount() {
		// console.log('unmounting');
		clearTimeout(this.timeoutId);
		this.props.setIsPreviewing(false);
	}

	sendChanges = () => {
		this.setState({
			sendingChanges: true,
		});
	}

	cancelSave = () => {
		// console.log('cancel');
		this.setState({
			sendingChanges: false,
		});
		return true;
	}

	onClickPreview = () => {
		this.props.setIsPreviewing(true);
		this.props.setCurrentPreview(this.props.tableId, this.props.recordId);
	}

	onClickClose = () => {
		this.props.setIsPreviewing(false);
		this.props.setCurrentPreview(null, null);
	}

	onClickIframe = () => {
		this.props.setPreviewViewType(PREVIEW_IFRAME);
	}
	onClickWindow = () => {
		this.props.setPreviewViewType(PREVIEW_WIN);
	}

	render() {

		if (!this.props.isViewingPreview) {
			return <Button className="button-preview" flat="true" onClick={this.onClickPreview}><Icon icon="eye" />Preview</Button>; 
		}

		// console.log(this.props.previewRecordId, this.state.sendingChanges);
		//on load, save total record as draft
		let msg = <Icon icon="times" fw side="center" />;
		
		//only send updated data
		// console.log(this.state.sendingChanges, !this.props.previewRecordId);
		if (this.state.sendingChanges || !this.props.previewRecordId) {
			msg = <SaveLivePreview key="previewsaver" tableId={this.props.tableId} recordId={this.props.recordId} callback={this.cancelSave} />;
		} 
		return (<ContainerDiv>
			<Tab onClick={this.onClickClose}>{msg}</Tab>
			<Tab onClick={this.onClickIframe} className={this.props.currentPreviewType === PREVIEW_IFRAME ? 'active' : null}>
				<Icon icon="columns" fw side="center" />
			</Tab>
			<Tab onClick={this.onClickWindow} className={this.props.currentPreviewType === PREVIEW_WIN ? 'active' : null}>
				<Icon icon="window-restore" fw side="center" />
			</Tab>
		</ContainerDiv>);

	}
}

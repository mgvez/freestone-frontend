import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Save from '../../containers/process/Save';
import SaveLivePreview from '../../containers/process/SaveLivePreview';

export default class PreviewRecord extends Component {
	static propTypes = {
		slug: PropTypes.string,
		tableId: PropTypes.number,
		lastEdit: PropTypes.number,
		recordId: PropTypes.string,
		isPreviewEdited: PropTypes.bool,
		currentLanguage: PropTypes.string,

		navigateToSlug: PropTypes.func,
	};

	componentWillMount() {
		// console.log('preview mounting');
		this.setState({
			saved: false,
			sendingChanges: false,
			savedRecordId: null,
		});
	}

	afterInitialSave = (savedRecord) => {
		this.props.navigateToSlug(this.props.tableId, savedRecord.recordId, this.props.currentLanguage);
		this.setState({
			saved: true,
		});
	}

	afterUpdateSave = () => {
		this.setState({
			sendingChanges: false,
		});
	}

	componentWillReceiveProps(props) {
		// console.log('props received ' + this.props.lastEdit);
		if (props.isPreviewEdited) {
			if (this.timeoutId) {
				// console.log('clear ' + this.timeoutId);
				clearTimeout(this.timeoutId);
			}
			this.timeoutId = setTimeout(this.sendChanges, 1200);
		}
	}

	componentWillUnmount() {
		clearTimeout(this.timeoutId);
	}

	sendChanges = () => {
		// console.log('sending preview ' + this.timeoutId);
		this.setState({
			sendingChanges: true,
		});
	}

	cancelSave = () => {
		// console.log('cancel');
		this.setState({
			saved: false,
			sendingChanges: false,
		});
	}

	render() {
		// console.log(this.props.isPreviewEdited);
		//on load, save total record as draft
		if (!this.state.saved) {
			return <Save tableId={this.props.tableId} recordId={this.props.recordId} callback={this.afterInitialSave} cancelSave={this.cancelSave} isTemporary />;
		} 

		let msg = <h2>waiting</h2>;
		//only send updated data
		if (this.state.sendingChanges) {
			msg = <SaveLivePreview tableId={this.props.tableId} recordId={this.props.recordId} callback={this.afterUpdateSave} />;
		} 
		return (<section className="saving">
			<header className="page-header">
				<div className="texts">
					{msg}
				</div>
			</header>
		</section>);

	}
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Save from '../../containers/process/Save';
import SaveLivePreview from '../../containers/process/SaveLivePreview';


export default class PreviewRecord extends Component {
	static propTypes = {
		slug: PropTypes.string,
		tableId: PropTypes.number,
		recordId: PropTypes.string,
		previewRecordId: PropTypes.number,
		lastEdit: PropTypes.number,
		isPreviewEdited: PropTypes.bool,
		isPreviewInited: PropTypes.bool,
		currentLanguage: PropTypes.string,

		setCurrentPreview: PropTypes.func,
	};

	constructor(props) {
		super(props);

		this.state = {
			sendingChanges: false,
		};
	}

	componentDidMount() {
		this.props.setCurrentPreview(this.props.tableId, this.props.recordId);

	}

	afterInitialSave = () => {
		// console.log('after init save');

	}

	afterUpdateSave = () => {
		// console.log('after update save');
		this.setState({
			sendingChanges: false,
		});

	}

	componentWillReceiveProps(props) {
		// console.log('props received ' + this.props.lastEdit, props.isPreviewEdited);
		if (props.isPreviewEdited) {
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

	render() {
		// console.log(this.props);
		//on load, save total record as draft
		if (!this.props.previewRecordId) {
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

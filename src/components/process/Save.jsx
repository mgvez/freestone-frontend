import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Save extends Component {
	static propTypes = {
		tableId: PropTypes.number,
		recordId: PropTypes.string,
		afterSaveLocation: PropTypes.string,

		table: PropTypes.object,
		tree: PropTypes.object,
		records: PropTypes.object,
		permissions: PropTypes.object,
		deleted: PropTypes.object,
		fields: PropTypes.array,
		saveState: PropTypes.object,
		isTemporary: PropTypes.bool,

		callback: PropTypes.func,
		saveRecord: PropTypes.func,
		cancelSave: PropTypes.func,
	};

	componentWillMount() {
		// console.log('MOUNT', this.props.records, this.props.deleted);
		//callback has priority over afterSaveLocation. If a callback is present, it will execute instead of redirecting to the location.
		this.props.saveRecord(this.props.table, this.props.tree, this.props.records, this.props.deleted, this.props.permissions, this.props.isTemporary, this.props.afterSaveLocation, this.props.callback);
	}

	render() {
		// console.log(this.props.saveState);
		const isError = !!this.props.saveState.status.error;
		let msgDisplay = null;
		if (isError) {
			msgDisplay = (<div>
				<h3 className="error-title">{this.props.saveState.status.msg}</h3>
				<div className="error-message">{this.props.saveState.status.error}</div>
				<div onClick={this.props.cancelSave} className="back-btn"><i className="fa fa-pencil"></i><span>Go back to form</span></div>
			</div>);
		} else {
			msgDisplay = (<div className="save-msg">
				{this.props.saveState.status.msg}
			</div>);
		}

		return (
			<section className="saving">
				<header className="page-header">
					<div className="texts">
						<h2>Saving...</h2>
						{
							Object.keys(this.props.saveState.files).map(tmpName => {
								const curPrc = this.props.saveState.files[tmpName];
								return <div key={tmpName} className="save-msg">Saving {tmpName} : {curPrc}%</div>;
							})
						}
						{msgDisplay}
					</div>
				</header>
			</section>
		);
	}
}

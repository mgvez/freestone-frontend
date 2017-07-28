import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { saveRecord } from '../../actions/save';
import { buildSaveRecordSelector } from '../../selectors/buildRecord';

@connect(
	buildSaveRecordSelector,
	dispatch => bindActionCreators({ saveRecord }, dispatch)
)
export class Save extends Component {
	static propTypes = {
		tableId: React.PropTypes.number,
		recordId: React.PropTypes.string,
		afterSaveLocation: React.PropTypes.string,

		table: React.PropTypes.object,
		tree: React.PropTypes.object,
		records: React.PropTypes.object,
		permissions: React.PropTypes.object,
		deleted: React.PropTypes.object,
		fields: React.PropTypes.array,
		saveState: React.PropTypes.object,
		isTemporary: React.PropTypes.bool,

		callback: React.PropTypes.func,
		saveRecord: React.PropTypes.func,
		cancelSave: React.PropTypes.func,
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

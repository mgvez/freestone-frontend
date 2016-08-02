import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { saveRecord } from 'actions/save';


import { buildSaveRecordSelector } from 'selectors/buildRecord';

@connect(
	buildSaveRecordSelector,
	dispatch => bindActionCreators({ saveRecord }, dispatch)
)
export class Save extends Component {
	static propTypes = {
		tableId: React.PropTypes.number,
		recordId: React.PropTypes.string,

		table: React.PropTypes.object,
		tree: React.PropTypes.object,
		records: React.PropTypes.object,
		deleted: React.PropTypes.object,
		fields: React.PropTypes.array,
		saveState: React.PropTypes.object,

		callback: React.PropTypes.func,
		saveRecord: React.PropTypes.func,
		cancelSave: React.PropTypes.func,
	};

	componentWillMount() {
		// console.log('MOUNT', this.props.records, this.props.deleted);
		this.props.saveRecord(this.props.table, this.props.tree, this.props.records, this.props.deleted, this.props.callback);
	}

	render() {
		// console.log(this.props.saveState);
		const isError = !!this.props.saveState.status.error;
		let msgDisplay = null;
		if (isError) {
			msgDisplay = (<div>
				<h2 className="error">{this.props.saveState.status.msg}</h2>
				<div>{this.props.saveState.status.error}</div>
				<div onClick={this.props.cancelSave} className="btn btn-primary btn-sm"><i className="fa fa-pencil"></i><span>Go back to form</span></div>
			</div>);
		} else {
			msgDisplay = (<div>
				{this.props.saveState.status.msg}
			</div>);
		}

		return (
			<section>
				Saving...
				{
					Object.keys(this.props.saveState.files).map(tmpName => {
						const curPrc = this.props.saveState.files[tmpName];
						return <div key={tmpName}>Saving {tmpName} : {curPrc}%</div>;
					})
				}
				{msgDisplay}
			</section>
		);
	}
}

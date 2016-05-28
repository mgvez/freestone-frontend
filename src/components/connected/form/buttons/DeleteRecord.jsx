import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import createRecord from 'freestone/createRecord';
import { setRecordDeleted, setShownRecord } from 'actions/record';

@connect(
	null,
	dispatch => bindActionCreators({ setRecordDeleted, setShownRecord }, dispatch)
)
export class DeleteRecord extends Component {
	static propTypes = {
		tableId: React.PropTypes.number,
		recordId: React.PropTypes.string,
		parentRecordId: React.PropTypes.string,
		
		setShownRecord: React.PropTypes.func,
		setRecordDeleted: React.PropTypes.func,
	};

	deleteRecord = () => {
		this.props.setRecordDeleted(this.props.tableId, this.props.recordId);
		if (this.props.parentRecordId) {
			this.props.setShownRecord(this.props.tableId, this.props.parentRecordId, null);
		}
	};

	render() {
		return <button onClick={this.deleteRecord} className="btn btn-sm btn-danger">Delete record</button>;
	}
}

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import createRecord from 'freestone/createRecord';
import { addRecord, setShownRecord } from 'actions/record';

@connect(
	null,
	dispatch => bindActionCreators({ addRecord, setShownRecord }, dispatch)
)
export class AddRecord extends Component {
	static propTypes = {
		table: React.PropTypes.object,
		highestOrder: React.PropTypes.number,
		parentTableId: React.PropTypes.number,
		parentRecordId: React.PropTypes.string,
		
		addRecord: React.PropTypes.func,
		setShownRecord: React.PropTypes.func,
	};

	addRecord = () => {
		const { newRecord, newRecordId } = createRecord(this.props.table, this.props.parentTableId, this.props.parentRecordId, this.props.highestOrder + 10);
		
		// console.log(newRecord);
		this.props.addRecord(this.props.table.id, newRecord);
		this.props.setShownRecord(this.props.table.id, this.props.parentRecordId, newRecordId);
	};

	render() {
		return <button onClick={this.addRecord} className="btn btn-sm btn-primary">Add record</button>;
	}
}

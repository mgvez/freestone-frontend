import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as recordActionCreators from 'actions/record';
import createRecord from 'freestone/createRecord';


@connect(
	null,
	dispatch => bindActionCreators(recordActionCreators, dispatch)
)
export class Header extends Component {
	static propTypes = {
		table: React.PropTypes.object,
		activeRecordId: React.PropTypes.string,
		parentRecordId: React.PropTypes.string,
		parentTableId: React.PropTypes.string,
		hasDeleteButton: React.PropTypes.bool,
		hasAddButton: React.PropTypes.bool,
		highestOrder: React.PropTypes.number,
		
		addRecord: React.PropTypes.func,
		setShownRecord: React.PropTypes.func,
		setRecordDeleted: React.PropTypes.func,
	};

	addRecord = () => {
		const { newRecord, newRecordId } = createRecord(this.props.table, this.props.parentTableId, this.props.parentRecordId, this.props.highestOrder + 10);
		
		console.log(newRecord);
		this.props.addRecord(this.props.table.id, newRecord);
		this.props.setShownRecord(this.props.table.id, this.props.parentRecordId, newRecordId);
	};

	deleteRecord = () => {
		console.log('delete');
		this.props.setRecordDeleted(this.props.table.id, this.props.activeRecordId);
		this.props.setShownRecord(this.props.table.id, this.props.parentRecordId, null);
	};

	render() {

		if (this.props.table) {

			let deleteBtn;
			if (this.props.activeRecordId && this.props.hasDeleteButton) {
				deleteBtn = (
					<button className="btn btn-sm btn-warning" onClick={this.deleteRecord}>Delete record</button>
				);
			}

			let addBtn;
			if (this.props.hasAddButton) {
				addBtn = <button className="btn btn-sm btn-default" onClick={this.addRecord}>Add record</button>;
			}

			return (
				<header>
					<h1>{this.props.table.displayLabel}</h1>
					<div>{this.props.table.help}</div>
					{addBtn}
					{deleteBtn}
				</header>
			);
		}

		return null;

	}
}

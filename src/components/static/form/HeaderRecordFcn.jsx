import React, { Component } from 'react';

import { ChangeSubformView } from 'components/connected/form/buttons/ChangeSubformView';
import { AddRecord } from 'components/connected/form/buttons/AddRecord';
import { DeleteRecord } from 'components/connected/form/buttons/DeleteRecord';


export class HeaderRecordFcn extends Component {
	static propTypes = {
		children: React.PropTypes.any,
		table: React.PropTypes.object,
		activeRecordId: React.PropTypes.string,
		parentRecordId: React.PropTypes.string,
		parentTableId: React.PropTypes.number,
		hasDeleteButton: React.PropTypes.bool,
		hasAddButton: React.PropTypes.bool,
		highestOrder: React.PropTypes.number,		
	};


	render() {

		let deleteBtn;
		if (this.props.activeRecordId && this.props.hasDeleteButton) {
			deleteBtn = (
				<DeleteRecord 
					tableId={this.props.table.id}
					parentRecordId={this.props.parentRecordId}
					recordId={this.props.activeRecordId}
				/>
			);
		}

		let addBtn;
		if (this.props.hasAddButton) {
			addBtn = (
				<AddRecord 
					table={this.props.table}
					parentRecordId={this.props.parentRecordId}
					parentTableId={this.props.parentTableId}
					highestOrder={this.props.highestOrder}
				/>
			);
		}

		return (
			<div className="record-fcn">
				{addBtn}
				{deleteBtn}
				<ChangeSubformView tableId={this.props.table.id} />
			</div>
		);

	}

}

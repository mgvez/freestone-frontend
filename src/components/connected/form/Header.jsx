import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as recordActionCreators from 'actions/record';

import { ChangeSubformView } from 'components/connected/form/buttons/ChangeSubformView';
import { AddRecord } from 'components/connected/form/buttons/AddRecord';
import { DeleteRecord } from 'components/connected/form/buttons/DeleteRecord';


@connect(
	null,
	dispatch => bindActionCreators(recordActionCreators, dispatch)
)
export class Header extends Component {
	static propTypes = {
		table: React.PropTypes.object,
		activeRecordId: React.PropTypes.string,
		parentRecordId: React.PropTypes.string,
		parentTableId: React.PropTypes.number,
		hasDeleteButton: React.PropTypes.bool,
		hasAddButton: React.PropTypes.bool,
		highestOrder: React.PropTypes.number,		
	};

	render() {

		if (this.props.table) {

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
				<header>
					<h1>{this.props.table.displayLabel}</h1>
					<div>{this.props.table.help}</div>
					{addBtn}
					{deleteBtn}
					<ChangeSubformView tableId={this.props.table.id} />

				</header>
			);
		}

		return null;

	}
}

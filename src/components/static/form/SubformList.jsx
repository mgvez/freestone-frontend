import React, { Component } from 'react';

import { SingleRecord } from 'components/connected/form/SingleRecord';
import { Header } from 'components/static/form/Header';
import { ChangeSubformView } from 'components/connected/form/buttons/ChangeSubformView';
import { AddRecord } from 'components/connected/form/buttons/AddRecord';

export class SubformList extends Component {
	static propTypes = {
		table: React.PropTypes.object,
		activeRecord: React.PropTypes.object,
		childrenRecords: React.PropTypes.array,
		parentTableId: React.PropTypes.number,
		parentRecordId: React.PropTypes.string,
		highestOrder: React.PropTypes.number,
		
		swapRecords: React.PropTypes.func,
		setShownRecord: React.PropTypes.func,
	};

	constructor(props) {
		super(props);
	}

	render() {
		if (!this.props.childrenRecords || !this.props.table) return null;
		const activeRecordId = this.props.activeRecord && this.props.activeRecord.id;

		return (
			<section className="subform">
				<header>
					<div className="fcn">
						<ChangeSubformView tableId={this.props.table.id} />
					</div>
					<Header 
						table={this.props.table}
					/>
				</header>
				{
					this.props.childrenRecords.map((record, index) => {
						return <SingleRecord key={record.id} tableName={this.props.table.name} recordId={record.id} hasDeleteButton />;
					})
				}
				{
					<AddRecord 
						table={this.props.table}
						parentRecordId={this.props.parentRecordId}
						parentTableId={this.props.parentTableId}
						highestOrder={this.props.highestOrder}
					/>
				}
			</section>
		);

	}
}
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
		language: React.PropTypes.string,

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
			<section className="subform subform-list">
				<header className="row">
					<div className="col-md-8">
						<Header table={this.props.table} />
					</div>
					<div className="col-md-3 col-md-offset-1 fcn">
						<ChangeSubformView tableId={this.props.table.id} />
					</div>
				</header>
				{
					this.props.childrenRecords.map((record, index) => {
						return <SingleRecord key={record.id} tableName={this.props.table.name} recordId={record.id} language={this.props.language}/>;
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

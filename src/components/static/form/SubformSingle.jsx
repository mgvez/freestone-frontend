import React, { Component } from 'react';

import { AddRecord } from 'components/connected/form/buttons/AddRecord';
import { Header } from 'components/static/form/Header';
import { SingleRecord } from 'components/connected/form/SingleRecord';


export class SubformSingle extends Component {
	static propTypes = {
		table: React.PropTypes.object,
		activeRecord: React.PropTypes.object,
		childrenRecords: React.PropTypes.array,
		parentTableId: React.PropTypes.number,
		parentRecordId: React.PropTypes.string,

	};

	render() {
		const activeRecordId = this.props.activeRecord && this.props.activeRecord.id;

		let addBtn;
		if (!this.props.childrenRecords || !this.props.childrenRecords.length) {
			addBtn = (
				<AddRecord 
					table={this.props.table}
					parentRecordId={this.props.parentRecordId}
					parentTableId={this.props.parentTableId}
				/>
			);
		}

		return (
			<section className="subform">
				<header>
					<Header table={this.props.table} />
					<nav className="tabs">
						{addBtn}
					</nav>
				</header>
				<SingleRecord tableName={this.props.table.name} recordId={activeRecordId} />
			</section>
		);

	}
}

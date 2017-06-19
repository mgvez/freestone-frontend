import React, { Component } from 'react';

import { AddRecord } from '../../../connected/form/buttons/AddRecord';
import { Header } from '../Header';
import { SingleRecord } from '../../../connected/form/SingleRecord';


export class SubformSingle extends Component {
	static propTypes = {
		table: React.PropTypes.object,
		activeRecord: React.PropTypes.object,
		childrenRecords: React.PropTypes.array,
		parentTableId: React.PropTypes.number,
		parentRecordId: React.PropTypes.string,
		language: React.PropTypes.string,
		isCollapsed: React.PropTypes.bool,

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
				<SingleRecord tableId={this.props.table.id} recordId={activeRecordId} parentRecordId={this.props.parentRecordId} language={this.props.language} />
			</section>
		);

	}
}

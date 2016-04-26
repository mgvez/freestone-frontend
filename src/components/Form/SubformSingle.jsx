import React, { Component } from 'react';

import { Header } from 'components/Form/Header';
import { SingleRecord } from 'containers/Form/SingleRecord';


export class SubformSingle extends Component {
	static propTypes = {
		table: React.PropTypes.object,
		activeRecord: React.PropTypes.object,
		childrenRecords: React.PropTypes.array,
		parentTableId: React.PropTypes.number,
		parentRecordId: React.PropTypes.string,

	};

	render() {
		if (!this.props.childrenRecords) return null;
		const activeRecordId = this.props.activeRecord && this.props.activeRecord.id;

		return (
			<section>
				<Header 
					table={this.props.table}
					activeRecordId={activeRecordId}
					hasAddButton={!this.props.childrenRecords || !this.props.childrenRecords.length}
					hasDeleteButton={this.props.childrenRecords && this.props.childrenRecords.length}
				/>
				<SingleRecord tableName={this.props.table.name} recordId={activeRecordId} />
			</section>
		);

	}
}

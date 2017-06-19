import React, { Component } from 'react';

import { DragDropContext as dragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { Tab } from './Tab';
import { AddRecord } from '../../../connected/form/buttons/AddRecord';

@dragDropContext(HTML5Backend)
export class TabList extends Component {
	static propTypes = {
		table: React.PropTypes.object,
		childrenRecords: React.PropTypes.array,
		parentTableId: React.PropTypes.number,
		parentRecordId: React.PropTypes.string,
		activeRecordId: React.PropTypes.string,
		highestOrder: React.PropTypes.number,

		swapRecords: React.PropTypes.func,
		setShownRecord: React.PropTypes.func,
	};

	render() {
		return (<nav className="tabs">
			{
				this.props.childrenRecords.map((record, index) => {

					const active = record.id === this.props.activeRecordId;
					return (<Tab
						key={record.id}
						displayLabel={record.label}
						hasOrder={!!this.props.table.orderField}
						isActive={active}
						recordId={record.id}
						index={index}
						tableId={this.props.table.id}
						parentRecordId={this.props.parentRecordId}
						setShownRecord={this.props.setShownRecord}
						swapRecords={this.props.swapRecords}
					/>);
				})
			}

			<AddRecord
				table={this.props.table}
				parentRecordId={this.props.parentRecordId}
				parentTableId={this.props.parentTableId}
				highestOrder={this.props.highestOrder}
			/>
		</nav>);
	}
}

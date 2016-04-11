import React, { Component } from 'react';
import { DragDropContext as dragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';


import { Tab } from 'components/Form/Tab';
import { SingleRecord } from 'containers/Form/SingleRecord';

@dragDropContext(HTML5Backend)
export class SubformTabbed extends Component {
	static propTypes = {
		table: React.PropTypes.object,
		activeRecord: React.PropTypes.object,
		childrenRecords: React.PropTypes.array,
		parentRecordId: React.PropTypes.string,
		
		swapRecords: React.PropTypes.func,
		setShownRecord: React.PropTypes.func,
	};

	render() {

		const activeRecordId = this.props.activeRecord && this.props.activeRecord.id;

		return (
			<div>
				<nav>
					{
						this.props.childrenRecords.map((record, index) => {
							const active = record.id === activeRecordId;
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
				</nav>
				<SingleRecord tableName={this.props.table.name} recordId={activeRecordId} />
			</div>
		);

	}
}

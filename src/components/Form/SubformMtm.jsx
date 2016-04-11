import React, { Component } from 'react';
import { DragDropContext as dragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';


@dragDropContext(HTML5Backend)
export class SubformMtm extends Component {
	static propTypes = {
		table: React.PropTypes.object,
		childrenRecords: React.PropTypes.array,
		parentRecordId: React.PropTypes.string,
	};

	render() {
		return (
			<div>
				{
				this.props.childrenRecords.map((record, index) => {
					console.log(record);
					return (<div
						key={record.id}
					/>);
				})
			}
			</div>
		);

	}
}

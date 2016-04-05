import React, { Component } from 'react';
import { DragSource as dragSource, DropTarget as dropTarget } from 'react-dnd';

const tabSource = {
	beginDrag(props) {
		// Return the data describing the dragged item
		const item = { 
			id: props.recordId,
			index: props.index,
		};
		// console.log(item.index);
		return item;
	},

	endDrag(props, monitor, component) {
		if (!monitor.didDrop()) {
			return;
		}
		// When dropped on a compatible target, do something
		const item = monitor.getItem();
		const dropResult = monitor.getDropResult();
	},
};


const tabTarget = {
	hover(props, monitor, component) {
		const dragId = monitor.getItem().id;
		const hoverId = props.recordId;
		// console.log(dragId, hoverId);
		// Don't replace items with themselves
		if (dragId === hoverId) {
			return;
		}
		props.swapRecords(dragId, hoverId);
	},
};

@dropTarget(
	(props) => {
		return `tab_${props.tableId}`;
	},
	tabTarget,
	connect => {
		return {
			connectDropTarget: connect.dropTarget(),
		};
	}
)
@dragSource(
	(props) => {
		return `tab_${props.tableId}`;
	},
	tabSource,
	(connect, monitor) => {
		return {
			// Call this function inside render()
			// to let React DnD handle the drag events:
			connectDragSource: connect.dragSource(),
			// You can ask the monitor about the current drag state:
			isDragging: monitor.isDragging(),
		};
	}
)
export class Tab extends Component {
	static propTypes = {
		tableId: React.PropTypes.number,
		parentRecordId: React.PropTypes.string,
		recordId: React.PropTypes.string,
		isActive: React.PropTypes.bool,
		displayLabel: React.PropTypes.string,
		index: React.PropTypes.number,

		setShownRecord: React.PropTypes.func,

		isDragging: React.PropTypes.bool,
		connectDragSource: React.PropTypes.func,
		connectDropTarget: React.PropTypes.func,
	};

	setShownRecord = () => {
		this.props.setShownRecord(this.props.tableId, this.props.parentRecordId, this.props.recordId);
	};

	render() {
		let className = this.props.isActive ? 'btn-success' : 'btn-primary';
		className = `btn ${className} btn-xs`;
		const { isDragging, connectDragSource, connectDropTarget } = this.props;
		// console.log(`render input ${this.props.index}`, isDragging);
		const opacity = isDragging ? 0.1 : 1;

		return connectDropTarget(connectDragSource(
			<a className={className} onClick={this.setShownRecord} style={{ opacity }}>
				{this.props.index + 1}. {this.props.displayLabel}
			</a>
		));
	}
}

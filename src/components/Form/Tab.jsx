import React, { Component } from 'react';
import { DragSource as dragSource, DropTarget as dropTarget } from 'react-dnd';

const tabSource = {
	beginDrag(props) {
		// Return the data describing the dragged item
		const item = { 
			id: `${props.tableId}_${props.recordId}`,
			index: props.index,
		};
		console.log(item);
		return item;
	},

	endDrag(props, monitor, component) {
		if (!monitor.didDrop()) {
			return;
		}

		// When dropped on a compatible target, do something
		const item = monitor.getItem();
		const dropResult = monitor.getDropResult();
		// CardActions.moveCardToList(item.id, dropResult.listId);
	},
};


const tabTarget = {
	hover(props, monitor, component) {
		const dragIndex = monitor.getItem().index;
		const hoverIndex = props.index;
		console.log(component, dragIndex, hoverIndex);
		// Don't replace items with themselves
		if (dragIndex === hoverIndex) {
			return;
		}

		// Determine rectangle on screen
		// const hoverBoundingRect = component.getDOMNode().getBoundingClientRect();

		// // Get vertical middle
		// const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

		// // Determine mouse position
		// const clientOffset = monitor.getClientOffset();

		// // Get pixels to the top
		// const hoverClientY = clientOffset.y - hoverBoundingRect.top;

		// // Only perform the move when the mouse has crossed half of the items height
		// // When dragging downwards, only move when the cursor is below 50%
		// // When dragging upwards, only move when the cursor is above 50%

		// // Dragging downwards
		// if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
		// 	return;
		// }

		// // Dragging upwards
		// if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
		// 	return;
		// }

		// // Time to actually perform the action
		// props.moveCard(dragIndex, hoverIndex);

		// // Note: we're mutating the monitor item here!
		// // Generally it's better to avoid mutations,
		// // but it's good here for the sake of performance
		// // to avoid expensive index searches.
		// monitor.getItem().index = hoverIndex;
	},
};

@dropTarget('tab', tabTarget, connect => {
	// console.log(connect.dropTarget());
	return {
		connectDropTarget: connect.dropTarget(),
	};
})
@dragSource(
	(props) => {
		// console.log(props);
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

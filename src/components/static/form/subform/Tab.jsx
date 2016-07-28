import React, { Component } from 'react';
import { DragSource as dragSource, DropTarget as dropTarget } from 'react-dnd';

function getTabGroup(props) {
	return `tab_${props.tableId}`;
}

@dropTarget(
	getTabGroup,
	{
		hover(props, monitor, component) {
			const dragId = monitor.getItem().id;
			const hoverId = props.recordId;
			// console.log(dragId, hoverId);
			if (dragId === hoverId) {
				return;
			}
			props.swapRecords(dragId, hoverId);
		},
	},
	connect => {
		return {
			connectDropTarget: connect.dropTarget(),
		};
	}
)
@dragSource(
	getTabGroup,
	{
		beginDrag(props) {
			return {
				id: props.recordId,
				index: props.index,
			};
		},
	},
	(connect, monitor) => {
		return {
			connectDragSource: connect.dragSource(),
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
		hasOrder: React.PropTypes.bool,

		setShownRecord: React.PropTypes.func,

		isDragging: React.PropTypes.bool,
		connectDragSource: React.PropTypes.func,
		connectDropTarget: React.PropTypes.func,
	};

	setShownRecord = () => {
		this.props.setShownRecord(this.props.tableId, this.props.parentRecordId, this.props.recordId);
	};

	getMarkup(opacity = 1) {
		let className = this.props.isActive ? 'active' : '';
		className = `tab ${className}`;
		const label = this.props.displayLabel || '-';
		return (
			<a className={className} onClick={this.setShownRecord} style={{ opacity }}>
				{label}
			</a>
		);
	}

	render() {

		if (this.props.hasOrder) {
			const { isDragging, connectDragSource, connectDropTarget } = this.props;
			// console.log(`render input ${this.props.index}`, isDragging);
			const opacity = isDragging ? 0.1 : 1;

			return connectDropTarget(connectDragSource(
				this.getMarkup(opacity)
			));
		}

		return this.getMarkup();

	}
}

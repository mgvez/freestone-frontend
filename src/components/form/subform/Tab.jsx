import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyledTab } from '../../../styles/Nav';
import { DragSource as dragSource, DropTarget as dropTarget } from 'react-dnd';

function getTabGroup(props) {
	return `tab_${props.tableId}`;
}

@dropTarget(
	getTabGroup,
	{
		hover(props, monitor) {
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
export default class Tab extends Component {
	static propTypes = {
		tableId: PropTypes.number,
		parentRecordId: PropTypes.string,
		recordId: PropTypes.string,
		isActive: PropTypes.bool,
		displayLabel: PropTypes.string,
		language: PropTypes.string,
		index: PropTypes.number,
		hasOrder: PropTypes.bool,

		setShownRecord: PropTypes.func,

		isDragging: PropTypes.bool,
		connectDragSource: PropTypes.func,
		connectDropTarget: PropTypes.func,
	};

	setShownRecord = () => {
		this.props.setShownRecord(this.props.tableId, this.props.parentRecordId, this.props.recordId, this.props.language);
	};

	getMarkup(opacity = 1) {
		const className = this.props.isActive ? 'active' : '';
		const label = this.props.displayLabel || '';
		return (
			<div className={className} onClick={this.setShownRecord} style={{ opacity }}>
				{label}
			</div>
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

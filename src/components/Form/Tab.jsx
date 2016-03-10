import React, { Component } from 'react';

export class Tab extends Component {
	static propTypes = {
		tableId: React.PropTypes.number,
		parentRecordId: React.PropTypes.string,
		recordId: React.PropTypes.string,
		isActive: React.PropTypes.bool,
		displayLabel: React.PropTypes.string,
		index: React.PropTypes.number,

		setShownRecord: React.PropTypes.func,
	};

	setShownRecord = (e) => {
		this.props.setShownRecord(this.props.tableId, this.props.parentRecordId, this.props.recordId);
	};

	render() {
		// console.log(`render input ${this.props.field.name}`);
		let className = this.props.isActive ? 'btn-success' : 'btn-primary';
		className = `btn ${className} btn-xs`;
		return (
			<a className={className} onClick={this.setShownRecord}>
				{this.props.index + 1}. {this.props.displayLabel}
			</a>
		);
	}
}

import React, { Component } from 'react';

export class Tab extends Component {
	static propTypes = {
		tableName: React.PropTypes.string,
		parentRecordId: React.PropTypes.string,
		recordId: React.PropTypes.string,
		isActive: React.PropTypes.bool,
		displayLabel: React.PropTypes.string,

		setShownRecord: React.PropTypes.func,
	};

	setShownRecord = (e) => {
		this.props.setShownRecord(this.props.tableName, this.props.parentRecordId, this.props.recordId);
	};

	render() {
		// console.log(`render input ${this.props.field.name}`);
		let className = this.props.isActive ? 'btn-success' : 'btn-primary';
		className = `btn ${className} btn-xs`;
		return (
			<a className={className} onClick={this.setShownRecord}>
				{this.props.recordId}. {this.props.displayLabel}
			</a>
		);
	}
}

import React, { Component } from 'react';


export class Header extends Component {
	static propTypes = {
		table: React.PropTypes.object,
		activeRecordId: React.PropTypes.string,
		hasDeleteButton: React.PropTypes.bool,
		hasAddButton: React.PropTypes.bool,
		
		deleteRecord: React.PropTypes.func,
		addRecord: React.PropTypes.func,
	};

	render() {

		if (this.props.table) {

			let deleteBtn;
			if (this.props.activeRecordId && this.props.hasDeleteButton) {
				deleteBtn = (
					<button className="btn btn-sm btn-warning" onClick={this.props.deleteRecord}>Delete record</button>
				);
			}

			let addBtn;
			if (this.props.hasAddButton) {
				addBtn = <button className="btn btn-sm btn-default" onClick={this.props.addRecord}>Add record</button>;
			}

			return (
				<header>
					<h1>{this.props.table.displayLabel}</h1>
					<div>{this.props.table.help}</div>
					{addBtn}
					{deleteBtn}
				</header>
			);
		}

		return null;

	}
}

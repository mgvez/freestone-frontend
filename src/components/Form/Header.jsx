import React, { Component } from 'react';


export class Header extends Component {
	static propTypes = {
		table: React.PropTypes.object,
		activeRecordId: React.PropTypes.string,
		
		deleteRecord: React.PropTypes.func,
		addRecord: React.PropTypes.func,
	};

	render() {

		if (this.props.table) {

			let deleteBtn;
			if (this.props.activeRecordId) {
				deleteBtn = (
					<button className="btn btn-sm btn-warning" onClick={this.props.deleteRecord}>Delete record</button>
				);
			}
			return (
				<header>
					<h1>{this.props.table.displayLabel}</h1>
					<div>{this.props.table.help}</div>
					<button className="btn btn-sm btn-default" onClick={this.props.addRecord}>Add record</button>
					{deleteBtn}
				</header>
			);
		}

		return null;

	}
}

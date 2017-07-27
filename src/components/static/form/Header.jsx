import React, { Component } from 'react';

export class Header extends Component {
	static propTypes = {
		table: React.PropTypes.object,
		label: React.PropTypes.string,
	};

	render() {

		if (this.props.table) {
			return (
				<div>
					<div>{this.props.table.displayLabel}</div>
					<h1>{this.props.label}</h1>
					<div className="table-help" dangerouslySetInnerHTML={{ __html: this.props.table.help }}></div>
				</div>
			);
		}

		return null;

	}
}

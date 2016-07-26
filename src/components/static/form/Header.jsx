import React, { Component } from 'react';

export class Header extends Component {
	static propTypes = {
		table: React.PropTypes.object,

	};

	render() {

		if (this.props.table) {
			return (
				<div>
					<h1>{this.props.table.displayLabel}</h1>					
					<div className="table-help" dangerouslySetInnerHTML={{ __html: this.props.table.help }}></div>
				</div>
			);
		}

		return null;

	}
}

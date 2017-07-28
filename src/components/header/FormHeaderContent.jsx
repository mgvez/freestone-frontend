import React, { Component } from 'react';

export class FormHeaderContent extends Component {
	static propTypes = {
		table: React.PropTypes.object,
		label: React.PropTypes.string,
	};

	render() {
		let titles;
		if (this.props.label) {
			titles = (<div>
				<div>{this.props.table.displayLabel}</div>
				<h1>{this.props.label}</h1>
			</div>);
		} else {
			titles = <h1>{this.props.table.displayLabel}</h1>;
		}

		if (this.props.table) {
			return (
				<div>
					{titles}
					<div className="table-help" dangerouslySetInnerHTML={{ __html: this.props.table.help }}></div>
				</div>
			);
		}

		return null;

	}
}

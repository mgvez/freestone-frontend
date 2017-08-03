import React, { Component } from 'react';

export class FormHeaderContent extends Component {
	static propTypes = {
		table: React.PropTypes.object,
		//optional label, that will be combined with the table's default title if present 
		label: React.PropTypes.string,
		titleOverride: React.PropTypes.string,
		descriptionAppend: React.PropTypes.string,
	};

	render() {

		// titleOverride={this.props.titleOverride}

		const h1 = this.props.titleOverride || this.props.label || this.props.table.displayLabel;

		let titles;
		if (this.props.label) {
			titles = (<div>
				<div>{this.props.table.displayLabel}</div>
				<h1>{h1}</h1>
			</div>);
		} else {
			titles = <h1>{h1}</h1>;
		}

		if (this.props.table) {
			return (
				<div>
					{titles}
					<div className="table-help" dangerouslySetInnerHTML={{ __html: `${this.props.table.help} ${this.props.descriptionAppend}` }}></div>
				</div>
			);
		}

		return null;

	}
}

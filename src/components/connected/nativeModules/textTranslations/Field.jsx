import React, { Component } from 'react';

export class Field extends Component {
	static propTypes = {
		children: React.PropTypes.array,
		label: React.PropTypes.string,
		description: React.PropTypes.string,
		val: React.PropTypes.any,
		lang: React.PropTypes.string,

		onChange: React.PropTypes.func,
	};

	render() {

		const languageAppend = this.props.lang ? <em className="lang-append">(<span>{this.props.lang}</span>)</em> : '';

		return (
			<div className="field row">
				<div className="col-md-4 field-label">
					<label>{this.props.label} {languageAppend}</label>
				</div>
				<div className="col-md-8">
					{this.props.children}
					<em className="field-description">{this.props.description}</em>
				</div>
			</div>
		);

	}
}

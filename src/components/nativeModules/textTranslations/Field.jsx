import React, { Component } from 'react';

export class Field extends Component {
	static propTypes = {
		children: React.PropTypes.any,
		label: React.PropTypes.string,
		description: React.PropTypes.string,
		val: React.PropTypes.any,
		lang: React.PropTypes.string,

		onChange: React.PropTypes.func,
	};

	render() {

		const languageAppend = this.props.lang ? <em className="lang-append">(<span>{this.props.lang}</span>)</em> : '';
		const desc = this.props.description ? <em className="field-description">{this.props.description}</em> : null;
		return (
			<div className="field row">
				<div className="col-sm-2 field-label">
					<label className="pull-right">{this.props.label} {languageAppend}</label>
				</div>
				<div className="col-sm-8">
					{this.props.children}
					{desc}
				</div>
			</div>
		);

	}
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Field extends Component {
	static propTypes = {
		children: PropTypes.any,
		label: PropTypes.string,
		description: PropTypes.string,
		val: PropTypes.any,
		lang: PropTypes.string,

		onChange: PropTypes.func,
	};

	render() {

		const languageAppend = this.props.lang ? <em className="lang-append">(<span>{this.props.lang}</span>)</em> : '';
		const desc = this.props.description ? <em className="field-description">{this.props.description}</em> : null;
		return (
			<div className="field row">
				<div className="col-sm-2 field-label">
					<label>{this.props.label} {languageAppend}</label>
				</div>
				<div className="col-sm-8">
					{this.props.children}
					{desc}
				</div>
			</div>
		);

	}
}

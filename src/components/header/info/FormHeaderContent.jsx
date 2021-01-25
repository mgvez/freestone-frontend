import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { Heading2 } from '../../../styles/Texts';
import { GridItem } from '../../../styles/Grid';

const Help = styled.div`
	margin-top: 10px;
	line-height: 1.2em;
	font-size: 0.8em;
`;

export default class FormHeaderContent extends Component {
	static propTypes = {
		table: PropTypes.object,
		//optional label, that will be combined with the table's default title if present 
		label: PropTypes.string,
		language: PropTypes.string,
		titleOverride: PropTypes.string,
		descriptionAppend: PropTypes.string,
	};

	render() {

		// titleOverride={this.props.titleOverride}
		
		const h1 = this.props.titleOverride || this.props.label || this.props.table.displayLabel;
		//append language if subform displays only records from the active language
		const languageAppend = this.props.table.hasLanguage ? ` - ${this.props.language}` : null;
		
		let titles;
		if (this.props.label) {
			titles = (<div>
				<div>{this.props.table.displayLabel} {languageAppend}</div>
				<Heading2>{h1}</Heading2>
			</div>);
		} else {
			titles = <Heading2>{h1} {languageAppend}</Heading2>;
		}

		const descriptionAppend = this.props.descriptionAppend || '';
		const tableHelp = this.props.table.help || '';
		let help;
		if (tableHelp || descriptionAppend) {
			help = (
				<Help dangerouslySetInnerHTML={{ __html: `${tableHelp} ${descriptionAppend}` }} />
			);
		} else {
			titles = <Heading2>{h1} {languageAppend}</Heading2>;
		}

		if (this.props.table) {
			return (
				<GridItem column="12">
					{titles}
					{help}
				</GridItem>
			);
		}

		return null;

	}
}

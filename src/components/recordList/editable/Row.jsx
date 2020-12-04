import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import RecordInteractions from '../../../containers/recordList/RecordInteractions';
import { getFieldElements } from './getFieldElements';
import { PRIKEY_ALIAS } from '../../../freestone/schemaProps';

const Interaction = styled.td`

	

`;

export default class Row extends Component {
	static propTypes = {
		table: PropTypes.object,
		fields: PropTypes.array,
		values: PropTypes.object,
		isLarge: PropTypes.bool,
		isHovering: PropTypes.bool,
		swappedRecords: PropTypes.object,

		handleHover: PropTypes.func,
		swapAnimated: PropTypes.func,
	};

	constructor(props) {
		super(props);
		const prikeyVal = this.props.values[PRIKEY_ALIAS];
		this.state = {
			key: `${this.props.table}_${prikeyVal}`,
		};
	}

	handleHover = () => {
		this.props.handleHover(this.props.values[PRIKEY_ALIAS]);
	}

	getInteractions() {
		return null;
	}

	render() {
		const { fields, values, table } = this.props;

		const interactions = this.getInteractions();

		const content = getFieldElements(table, fields, values);

		//ROW NORMAL, LARGE
		if (this.props.isLarge) {
			return (
				<tr ref={(el) => { this.recordRow = el; }} onMouseOver={this.handleHover}>
					{content}
					<Interaction>
						{interactions}
					</Interaction>
				</tr>
			);
		}

		//ROW NORMAL, MOBILE
		return (
			<tr ref={(el) => { this.recordRow = el; }}>
				<td>
					{content}
				</td>
				<Interaction>
					{interactions}
				</Interaction>
			</tr>
		);

	}

}

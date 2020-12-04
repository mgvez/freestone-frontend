import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { PRIKEY_ALIAS } from '../../../freestone/schemaProps';

import Heading from './Heading';
import Row from './Row';

import colors from '../../../styles/Colors';
import cssVariables from '../../../styles/Variables';
import { darken } from '../../../styles/Utils';

let levelStyles = '';
for (let i = 2; i < 11; i++) {
	levelStyles += `
	tr.level-${i} {
		td {
			background: ${darken(colors.white, i * 0.02)};
		}
	}
	`;
}

const ListTable = styled.table`
	width: 100%;
	margin-top: 20px;

	.group-heading {
		td {
			background: ${colors.backgroundLight};
		}
	}

	tr:hover {
		td {
			background: ${colors.backgroundLight};
		}
	}

	tr.level-1 {
		td:not(:last-child) {
			font-weight: bold;
		}
	}

	${levelStyles};

	th, td {
		text-align: left;
		border-bottom: 1px solid ${colors.borderLight};
		border-top: 1px solid ${colors.borderLight};

		&:first-child {
			border-left: 1px solid ${colors.borderLight};
		}

		&:last-child {
			border-right: 1px solid ${colors.borderLight};
		}
	}

	th {
		padding: 20px 20px;
		background: ${colors.backgroundMainAccent};
		font-weight: ${cssVariables.fontWeightBold}
	}

	td {
		padding: 2px;
		vertical-align: middle;
		background: ${colors.white};
		max-width: 200px;
		input {
			border: 1px black solid;
		}
	}
	

`;

export default class EditableList extends Component {
	static propTypes = {
		isLarge: PropTypes.bool,
		hoveringId: PropTypes.string,
		tableName: PropTypes.string,

		params: PropTypes.shape({
			page: PropTypes.string,
			filter: PropTypes.string,
			search: PropTypes.string,
			order: PropTypes.string,
		}),


		table: PropTypes.object,
		batchEditableFields: PropTypes.array,
		groupedRecords: PropTypes.array,
		swappedRecords: PropTypes.object,

		fetchList: PropTypes.func,

	};

	constructor(props) {
		super(props);
		this.state = { hoveringId: 0 };
	}

	/**
		Les rows appellent le hover ici
	*/
	handleHover = (recordId) => {
		// console.log('hovering %s', recordId);
		this.setState({ hoveringId: recordId });
	}

	hideAllHovers = () => {
		this.handleHover(null);
	}

	render() {

		let heading = null;
		if (this.props.isLarge) {
			heading = (<thead>
				<Heading
					fields={this.props.batchEditableFields}
					tableName={this.props.tableName}
					params={this.props.params}
					isSelfTree={this.props.table.isSelfTree}
					fetchList={this.fetchList}
				/>
			</thead>);
		}
		return (
			<ListTable onMouseLeave={this.hideAllHovers} ref={el => this._list = el}>
				{heading}
				{
					this.props.groupedRecords.map((group, groupIdx) => {
						let groupHeading;
						if (group.label) {
							groupHeading = (
								<tr className="group-heading">
									<td colSpan="20">
										<strong>{group.label}</strong>
									</td>
								</tr>
							);
						}

						return (
							<tbody key={groupIdx}>
							{groupHeading}
							{
								group.records.map((record) => {
									const pk = record[PRIKEY_ALIAS];
									const isHovering = this.props.hoveringId === pk;

									return (<Row
										key={`${this.props.table.name}_${pk}`}
										fields={this.props.batchEditableFields}
										values={record}
										table={this.props.table}
										isLarge={this.props.isLarge}
										isHovering={isHovering}
										handleHover={this.handleHover}
										swappedRecords={this.props.swappedRecords}
										fetchRecords={this.fetchRecords}
									/>);
								})
							}
							</tbody>
						);
					})
				}
			</ListTable>
		);
	}
}

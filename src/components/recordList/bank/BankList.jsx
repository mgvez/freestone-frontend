import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { PRIKEY_ALIAS } from '../../../freestone/schemaProps';

import BankListCell from '../../../containers/recordList/bank/BankListCell';
import BankCategoriesSidebar from '../../../containers/recordList/bank/BankCategoriesSidebar';

import { Heading2 } from '../../../styles/Texts';
import styled from 'styled-components';
import colors from '../../../styles/Colors';
import { GridContainer, GridItem, GridContainerStyle } from '../../../styles/Grid';

const SectionsContainer = styled.div`
	margin-top: 40px;
	${GridContainerStyle};
`;

const GroupContainer = styled.div`
	margin-bottom: 40px;
	border-bottom: 1px ${colors.borderMedium} solid;
`;

export default class BankList extends Component {
	static propTypes = {
		isLarge: PropTypes.bool,
		hoveringId: PropTypes.string,
		tableName: PropTypes.string,
		bankName: PropTypes.string,
		table: PropTypes.object,
		groupedRecords: PropTypes.array,
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
		return (
			<SectionsContainer>
				<GridItem columns="3">
					<BankCategoriesSidebar bankName={this.props.bankName} tableName={this.props.tableName} />
				</GridItem>
				<GridItem columns="9" key="result">
				{
					this.props.groupedRecords.map((group, groupIdx) => {
						let groupHeading;
						if (group.label) {
							groupHeading = (
								<Heading2>{group.label}</Heading2>
							);
						}
						// console.log(group.records.length + ' records');
						return (
							<GroupContainer key={groupIdx}>
								{groupHeading}
								<GridContainer>
								{
									group.records.map((record) => {
										const pk = record[PRIKEY_ALIAS];
										return (<BankListCell 
											key={`${this.props.table.name}_${pk}`}
											record={record}
											table={this.props.table}
										/>);
									})
								}
								</GridContainer>
							</GroupContainer>
						);

					})
				}
				</GridItem>
			</SectionsContainer>
		);
	}
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { PRIKEY_ALIAS, BANK_CATEG_FOREIGN_FIELD } from '../../freestone/schemaProps';

import BankListCell from '../../containers/recordList/BankListCell';
import ListNavLink from '../../containers/recordList/ListNavLink';

import { Heading2 } from '../../styles/Texts';
import styled, { css } from 'styled-components';
import colors from '../../styles/Colors';
import { THUMBNAIL_SIZE } from '../../freestone/settings';

const SectionsContainer = styled.div`
	display:flex;
	align-items: flex-start;
	flex-wrap: nowrap;
`;

const FiltersContainer = styled.section`
	background: ${colors.gray90};
	border: 1px ${colors.gray76} solid;
	margin: 0 12px;
	flex: 0 0 ${THUMBNAIL_SIZE}px;
`;

const CellsContainer = styled.div`
	display:flex;
	flex-wrap: wrap;
`;

const CategLink = styled(ListNavLink)`
	display:block;
	color:red;
`;

export default class BankList extends Component {
	static propTypes = {
		isLarge: PropTypes.bool,
		hoveringId: PropTypes.string,
		bankName: PropTypes.string,
		categories: PropTypes.array,

		params: PropTypes.shape({
			tableName: PropTypes.string,
			page: PropTypes.string,
			search: PropTypes.string,
			filter: PropTypes.array,
			order: PropTypes.string,
		}),


		table: PropTypes.object,
		groupedRecords: PropTypes.array,

		fetchBankCategories: PropTypes.func,

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

	componentDidUpdate() {
		this.requireData();
	}

	requireData() {
		if (!this.props.categories) this.props.fetchBankCategories(this.props.bankName);
	}

	render() {
		// console.log(this.props.categories);

		const categories = this.props.categories && this.props.categories.map((category) => {
			return <CategLink key={category.prikey} params={this.props.params} filter={{ [BANK_CATEG_FOREIGN_FIELD]: category.prikey }}>{category.name} ({category.n_items})</CategLink>;
		});

		return (
			<SectionsContainer>
				<FiltersContainer key="filters">
					<Heading2>Show</Heading2>
					{categories}
				</FiltersContainer>
				<section key="result">
				{
					this.props.groupedRecords.map((group, groupIdx) => {
						let groupHeading;
						if (group.label) {
							groupHeading = (
								<Heading2>{group.label}</Heading2>
							);
						}

						return (
							<div key={groupIdx}>
								{groupHeading}
								<CellsContainer>
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
								</CellsContainer>
							</div>
						);

					})
				}
				</section>
			</SectionsContainer>
		);
	}
}

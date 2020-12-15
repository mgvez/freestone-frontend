import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { BANK_CATEG_FOREIGN_FIELD } from '../../../freestone/schemaProps';

import ListNavLink from '../../../containers/recordList/ListNavLink';
import BankCategoryAdd from '../../../containers/recordList/bank/BankCategoryAdd';

import { Heading2 } from '../../../styles/Texts';
import styled from 'styled-components';
import colors from '../../../styles/Colors';
import cssVars from '../../../styles/Variables';
import { THUMBNAIL_SIZE } from '../../../freestone/settings';
import { Button } from '../../../styles/Button';

const FiltersContainer = styled.section`
	background: ${colors.backgroundLightest};
	border: 1px ${colors.borderMedium} solid;
	padding: 12px;
	flex: 0 0 ${THUMBNAIL_SIZE}px;
`;

const CategList = styled.ul`
	margin: 20px 0;
	padding: 0;
	`;

const CategLink = styled.li`
	border-bottom: 1px ${colors.borderLight} solid;
	list-style: none;

	a {
		display: block;
		color: ${colors.linksPrimary};
		font-weight: ${cssVars.fontWeightSemibold};
		padding: 10px 15px;
		text-decoration: none;
		cursor: pointer;
		transition: background 0.3s;

		&:hover {
			color: ${colors.accentPrimary};
			background: ${colors.backgroundLight};
		}

		&.active {
			color: ${colors.accentPrimary};
			background: ${colors.backgroundMain};
		}
	}
`;

export default class BankCategoriesSidebar extends Component {
	static propTypes = {

		tableName: PropTypes.string,
		gotoOnChoose: PropTypes.string,
		bankName: PropTypes.string,
		categories: PropTypes.array,
		isChoosingBankItem: PropTypes.bool, //indicate whether we are in the process of choosing an item to put in a record, or merely browsing the list
		bankDestination: PropTypes.object,

		fetchBankCategories: PropTypes.func,
		cancelBankSelect: PropTypes.func,
		goTo: PropTypes.func,
		setFieldVal: PropTypes.func,

	};

	componentDidMount() {
		this.requireData();
	}

	componentDidUpdate() {
		this.requireData();
	}

	requireData() {
		if (!this.props.categories) this.props.fetchBankCategories(this.props.bankName);
	}

	onCancel = () => {
		// reset content to what it was before
		const { tableId, recordId, fieldId, contentBefore } = this.props.bankDestination;
		if (contentBefore) {
			this.props.setFieldVal(tableId, recordId, fieldId, contentBefore);
		}

		this.props.cancelBankSelect();
		this.props.goTo(this.props.gotoOnChoose);
	}

	render() {

		const categories = this.props.categories && this.props.categories.map((category) => {
			return (
				<CategLink key={category.prikey} >
					<ListNavLink 
						tableName={this.props.tableName} 
						filter={{ [BANK_CATEG_FOREIGN_FIELD]: category.prikey }}
						activeClassName="active"
					>
						{category.name} ({category.n_items})
					</ListNavLink>
				</CategLink>
			);
		});

		let cancelBtn = null;
		if (this.props.isChoosingBankItem) {
			cancelBtn = <Button onClick={this.onCancel} fullwidth="true" danger="true">Cancel Selection</Button>;
		}

		return (
			<FiltersContainer>
				{cancelBtn}
				<Heading2>Filters</Heading2>
				<CategList>{categories}</CategList>
				
				<BankCategoryAdd bankName={this.props.bankName} />
			</FiltersContainer>
		);
	}
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { BANK_CATEG_FOREIGN_FIELD } from '../../../freestone/SchemaProps';

import ListNavLink from '../../../containers/recordList/ListNavLink';
import BankCategoryAdd from '../../../containers/recordList/bank/BankCategoryAdd';

import { Heading2, Heading3 } from '../../../styles/Texts';
import styled from 'styled-components';
import colors from '../../../styles/Colors';
import { THUMBNAIL_SIZE } from '../../../freestone/settings';
import { Button } from '../../../styles/Button';

const FiltersContainer = styled.section`
	background: ${colors.gray90};
	border: 1px ${colors.gray76} solid;
	margin: 0 12px;
	flex: 0 0 ${THUMBNAIL_SIZE}px;
`;

const CategLink = styled.li`
	
	a {
		display:block;
		color:red;
		&.active{
			color: green;
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

		fetchBankCategories: PropTypes.func,
		cancelBankSelect: PropTypes.func,
		goTo: PropTypes.func,
		

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
			cancelBtn = <Button onClick={this.onCancel} round="true" danger="true">Cancel Selection</Button>;
		}

		return (
			<FiltersContainer>
				{cancelBtn}
				<Heading2>Show</Heading2>
				<ul>{categories}</ul>
				
				<BankCategoryAdd bankName={this.props.bankName} />
			</FiltersContainer>
		);
	}
}

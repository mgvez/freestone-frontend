import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uniqueId from '../../../utils/UniqueId';

import { BANK_IMG_NAME, BANK_IMG_CATEGORIES_TABLE, BANK_DOCS_CATEGORIES_TABLE } from '../../../freestone/SchemaProps';

import { Heading3 } from '../../../styles/Texts';
import { Button } from '../../../styles/Button';
import styled from 'styled-components';
import colors from '../../../styles/Colors';

const AddContainer = styled.section`

`;

const FormContainer = styled.section`
	padding: 12px 0;
	display:flex;
	input {
		flex-basis: 75%;
		margin-right: 5px;
	}
`;

export default class BankCategoryAdd extends Component {
	static propTypes = {
		bankName: PropTypes.string,
		saveSingleRecord: PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.state = { value: '' };
	}
	
	handleChange = (event) => {
		this.setState({ value: event.target.value });
	}

	onSaveNewCateg = () => {
		const tableName = this.props.bankName === BANK_IMG_NAME ? BANK_IMG_CATEGORIES_TABLE : BANK_DOCS_CATEGORIES_TABLE;
		const recordId = uniqueId();
		this.props.saveSingleRecord(
			tableName,
			recordId,
			{
				name: this.state.value,
			}
		);
	}

	render() {
		return (
			<AddContainer>
				<Heading3>Add a category</Heading3>
				<FormContainer>
					<input value={this.state.value} onChange={this.handleChange} />
					<Button info="true" onClick={this.onSaveNewCateg} >Add</Button>
				</FormContainer>
			</AddContainer>
		);
	}
}

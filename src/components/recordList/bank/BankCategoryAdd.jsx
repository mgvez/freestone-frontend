import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uniqueId from '../../../utils/UniqueId';

import { BANK_IMG_NAME, BANK_IMG_CATEGORIES_TABLE, BANK_DOCS_CATEGORIES_TABLE } from '../../../freestone/SchemaProps';

import { Heading3 } from '../../../styles/Texts';
import { Button } from '../../../styles/Button';
import styled from 'styled-components';
import colors from '../../../styles/Colors';
import { getInputCss, Input } from '../../../styles/Input';

const AddContainer = styled.section`
	margin-top: 40px;
`;

const FormContainer = styled.section`
	position: relative;
	margin: 12px 0;
	
	input {
		margin-bottom: 0;
		border: 1px solid ${colors.borderLight};
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
					<Input value={this.state.value} rounded onChange={this.handleChange} />
					<Button info="true" inputCta onClick={this.onSaveNewCateg} >Add</Button>
				</FormContainer>
			</AddContainer>
		);
	}
}

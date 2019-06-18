import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { TYPE_LANGUAGE, BANK_PATH_ALIAS } from '../../freestone/SchemaProps';
import { StyledSingleRecord } from '../../styles/Form';
import colors from '../../styles/Colors';

import Subform from '../../containers/form/subform/Subform';
import DeleteRecord from '../../containers/form/buttons/DeleteRecord';
import FieldGroup from '../../containers/form/FieldGroup';
import Field from './Field';
import { GridContainer, GridItem } from '../../styles/Grid';

const SideBar = styled.div`
	padding: 30px;
	background: ${colors.backgroundDark};
	color: ${colors.white};
	
	label {
		color: ${colors.white};
	}

`;

export default class SingleRecord extends Component {
	static propTypes = {
		tableId: PropTypes.number,
		recordId: PropTypes.string,
		parentRecordId: PropTypes.string,
		parentTableId: PropTypes.number,
		isSubform: PropTypes.bool,
		isGod: PropTypes.bool,
		
		table: PropTypes.object,
		children: PropTypes.array,
		record: PropTypes.object,
		recordUnaltered: PropTypes.object,
		mainFields: PropTypes.array,
		asideFields: PropTypes.array,
		env: PropTypes.object,
		language: PropTypes.string,
		isRoot: PropTypes.bool,

		fetchTable: PropTypes.func,
		fetchRecord: PropTypes.func,
		setFieldVal: PropTypes.func,
	};

	componentDidMount() {
		this.requireData(this.props);
	}

	componentDidUpdate() {
		// console.log('receive', nextProps.table.id, nextProps.table === this.props.table);
		this.requireData(this.props);
	}

	requireData(props) {
		const { tableId, recordId } = props;
		// console.log(props.recordId);
		if (!props.table) this.props.fetchTable(tableId);

		if (recordId && !props.record) {
			// console.log(`fetch record ${tableId}.${recordId}`);
			this.props.fetchRecord(tableId, recordId);
		}
	}

	renderChild = (child) => {
		return child && child.isDisplay ? (
			<GridItem key={child.tableId} columns="12">
				<Subform
					tableId={child.tableId}
					titleOverride={child.titleOverride}
					descriptionAppend={child.descriptionAppend}
					parentTableId={this.props.table.id}
					parentRecordId={this.props.recordId}
					language={this.props.language}
				/>
			</GridItem>
		) : null;
	}

	renderField = (field, isAside = false) => {
		if (field.subformPlaceholder) {
			if (!isAside) {
				const child = this.props.children.find(candidate => candidate.tableId === field.subformPlaceholder);
				// console.log(child);
				return this.renderChild(child);
			}
			return null;
		}

		//if field is language-specific, display it only if the current language is the field's
		// console.log(this.props);
		//or we may have a field that contains the language for the whole record. If so, and record is children, hide labguage field (it is preset at record creation)
		const isShowField = ((field.language && field.language === this.props.language) || !field.language) && (!this.props.isSubform || field.type !== TYPE_LANGUAGE);
		// console.log(this.props.record);
		return isShowField ? (<Field
			key={field.id} 
			field={field}
			tableName={this.props.table.name}
			recordId={this.props.recordId}
			val={this.props.record[field.id]}
			absolutePath={this.props.record[`${field.id}${BANK_PATH_ALIAS}`]}
			origVal={this.props.recordUnaltered && this.props.recordUnaltered[field.id]}
			parentRecordId={this.props.parentRecordId}
			setFieldVal={this.props.setFieldVal}
			env={this.props.env}
			lang={field.language}
			isRoot={this.props.isRoot}
		/>) : null;
	}

	renderGroups(fields, isAside) {
		return fields.map((group) => {
			//group is not a group of fields, it's only a placeholder to place a subform amongst main table's fields list.
			const groupFieldRows = group.fields.map((field) => this.renderField(field, isAside)).filter(a => a);
			if (group.isPlaceholder) {
				return groupFieldRows;
			}
			return <FieldGroup key={group.key} id={group.key} label={group.label}>{groupFieldRows}</FieldGroup>;
		}, []);
	}

	render() {
		let form;
		let subforms;

		// console.log('render', this.props.table.name);
		// console.log('render', this.props.table, this.props.record);
		if (this.props.table && this.props.record) {

			let deleteBtn;
			if (!this.props.isRoot) {
				deleteBtn = (<DeleteRecord 
					tableId={this.props.table.id}
					recordId={this.props.recordId}
					language={this.props.table.hasLanguage ? this.props.language : null}
				/>);
			}

			let sidebar;
			if (this.props.asideFields.length > 0) {
				sidebar = (
					<GridItem columns="4">
						<SideBar>
							{this.renderGroups(this.props.asideFields, true)}
						</SideBar>
					</GridItem>
				);
			}

			const subsiteField = null;//(this.props.isGod && this.props.table.isSubsiteDependent) ? <div>subsite</div> : null;

			const recIdDisplay = this.props.isGod ? <small><em>Record id {this.props.recordId}</em></small> : '';
			// const previewId = this.props.record[PREVIEWID_PSEUDOFIELD_ALIAS];
			// const previewIdDisplay = previewId ? <small><em>Preview {previewId}</em></small> : null;
			form = (
				<article>
					{subsiteField}
					<GridContainer>
						<GridItem columns="6">
							{recIdDisplay}
						</GridItem>
						<GridItem columns="6" justify="right">
							{deleteBtn}
						</GridItem>
					</GridContainer>
					<GridContainer>
						<GridItem columns={`${sidebar ? 8 : 12}`}>
							{this.renderGroups(this.props.mainFields)}
						</GridItem>
						{sidebar}
					</GridContainer>
				</article>
			);

			//shows child forms that are not previously placed through a placeholder
			if (this.props.children) {
				subforms = (
					<div>
						{this.props.children.map(child => (!child.hasPlaceholder || null) && this.renderChild(child))}
					</div>
				);

			}
		}
		return (
			<StyledSingleRecord>
				{form}
				{subforms}
			</StyledSingleRecord>
		);
	}
}

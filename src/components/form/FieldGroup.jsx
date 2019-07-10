import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ToggleCollapse from './buttons/ToggleCollapse';
import { StyledFieldGroup } from '../../styles/Input';
import { GridContainer, GridItem, GridContainerStyle } from '../../styles/Grid';
import { FieldGroupTabs, TabsContainer } from '../../styles/Nav';
import styled from 'styled-components';
import { TYPE_LANGUAGE, BANK_PATH_ALIAS } from '../../freestone/schemaProps';
import Field from './Field';
import Subform from '../../containers/form/subform/Subform';

export default class FieldGroup extends Component {
	static propTypes = {
		id: PropTypes.string,
		tableId: PropTypes.number,
		recordId: PropTypes.string,
		parentRecordId: PropTypes.string,
		groups: PropTypes.array,
		activeGroup: PropTypes.string,
		isActive: PropTypes.bool,
		toggleFieldGroup: PropTypes.func,

		env: PropTypes.object,
		language: PropTypes.string,
		isRoot: PropTypes.bool,
		isSubform: PropTypes.bool,
		table: PropTypes.object,
		children: PropTypes.array,
		record: PropTypes.object,
		recordUnaltered: PropTypes.object,
		setFieldVal: PropTypes.func,
	}

	clickCollapse = (idx) => {
		const clicked = this.props.groups[idx];
		this.props.toggleFieldGroup(clicked.key, this.props.tableId);
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

	renderField = (field, isTabActive) => {
		if (!isTabActive) {
			return null;
		}
		
		if (field.subformPlaceholder) {
			const child = this.props.children.find(candidate => candidate.tableId === field.subformPlaceholder);
			return this.renderChild(child);
		}

		//if field is language-specific, display it only if the current language is the field's
		// console.log(this.props);
		//or we may have a field that contains the language for the whole record. If so, and record is children, hide labguage field (it is preset at record creation)
		const isShowField = ((field.language && field.language === this.props.language) || !field.language) && (!this.props.isSubform || field.type !== TYPE_LANGUAGE);
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

	render() {
		const tabs = (
			<GridContainer>
				<GridItem column="12">
					<TabsContainer className="tab-list">
						{this.props.groups.map((group, idx) => {
							return group && group.label ? ( 
								<ToggleCollapse isActive={!group.isActive} onClick={() => this.clickCollapse(idx)} key={group.label} label={group.label} />
							) : null;
						})}
					</TabsContainer>
				</GridItem>
			</GridContainer>
		);
		
		const fields = (
			<div className="tab-content">
				{this.props.groups.map((group) => {
					const isTabActive = group.key === this.props.activeGroup || !group.label;
					const groupFieldRows = group.fields.map((field) => this.renderField(field, isTabActive)).filter(a => a);
					if (group.isPlaceholder) {
						return groupFieldRows;
					}

					return <GridContainer>{groupFieldRows}</GridContainer>;
				})}
			</div>
		);

		let subforms;
		//shows child forms that are not previously placed through a placeholder
		if (this.props.children) {
			subforms = (
				<div>
					{this.props.children.map(child => (!child.hasPlaceholder || null) && this.renderChild(child))}
				</div>
			);
		}

		return (
			<FieldGroupTabs className="tabs">
				{tabs}
				{fields}
				{subforms}
			</FieldGroupTabs>
		);
	}
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SetVisibleTab from './buttons/SetVisibleTab';
import Field from './Field';
import Subform from '../../containers/form/subform/Subform';
import { TYPE_LANGUAGE, BANK_PATH_ALIAS } from '../../freestone/schemaProps';

import { GridContainer, GridItem } from '../../styles/Grid';
import { TabsContainer, Sidebar } from '../../styles/Form';

export default class FieldGroup extends Component {
	static propTypes = {
		id: PropTypes.string,
		tableId: PropTypes.number,
		recordId: PropTypes.string,
		parentRecordId: PropTypes.string,
		groups: PropTypes.array,
		activeGroup: PropTypes.string,
		tabbedFieldGroups: PropTypes.func,
		toggleFieldGroups: PropTypes.func,

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

	clickTab = (idx) => {
		const clicked = this.props.groups[idx];
		this.props.tabbedFieldGroups(clicked.key, this.props.tableId);
	}

	clickCollapse = () => {
		this.props.toggleFieldGroups(this.props.id);
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

	renderTabs = () => {
		if (this.props.groups.length > 1) {
			return (<GridContainer key="tabs">
				<GridItem column="12">
					<TabsContainer className="tab-list">
						{this.props.groups.map((group, idx) => {
							const isActive = this.props.activeGroup === group.key;
							return group && group.label ? ( 
								<SetVisibleTab isActive={isActive} onClick={() => this.clickTab(idx)} key={group.label} label={group.label} />
							) : null;
						})}
					</TabsContainer>
				</GridItem>
			</GridContainer>);
		}
		return null;
	}

	render() {
		const classNames = [];
		const tabs = this.renderTabs();
		
		classNames.push('field-group-collapsable');
		if (this.props.isSubform) {
			classNames.push('field-group-collapsed');
		}
		
		const fields = (
			<div key="fields">
				{this.props.groups.map((group) => {
					const isTabActive = group.key === this.props.activeGroup || !group.label;

					const groupFieldRows = group.fields.map((field) => {
						if (!field.isSecondary) {
							return this.renderField(field, isTabActive);
						}
						return null;
					}).filter(a => a);
					
					const asideGroupFieldRows = group.fields.map((field) => {
						if (field.isSecondary) {
							return this.renderField(field, isTabActive);
						}
						return null;
					}).filter(a => a);

					if (group.isPlaceholder) {
						classNames.push('field-group');
						return groupFieldRows;
					}

					return (
						<GridContainer>
							<GridItem columns={`${asideGroupFieldRows.length > 0 ? '8' : '12'}`}>
								{groupFieldRows}
							</GridItem>
							{asideGroupFieldRows.length > 0 &&
								<GridItem columns="4">
									<Sidebar>
										{asideGroupFieldRows}
									</Sidebar>
								</GridItem>
							}
						</GridContainer>
					);
				})}
			</div>
		);

		let subforms;
		//shows child forms that are not previously placed through a placeholder
		if (this.props.children) {
			subforms = (
				<div key="subforms" className={classNames.join(' ')}>
					{this.props.children.map(child => (!child.hasPlaceholder || null) && this.renderChild(child))}
				</div>
			);
		}

		return (
			<div>
				{tabs}
				{fields}
				{subforms}
			</div>
		);
	}
}

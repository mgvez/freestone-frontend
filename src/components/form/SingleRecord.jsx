import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TYPE_LANGUAGE, BANK_PATH_ALIAS } from '../../freestone/schemaProps';
import styled from 'styled-components';
import colors from '../../styles/Colors';

import { StyledSingleRecord, TabsContainer } from '../../styles/Form';
import { StyledFieldGroup } from '../../styles/Input';
import SetVisibleTab from './buttons/SetVisibleTab';

import Subform from '../../containers/form/subform/Subform';
import DeleteRecord from '../../containers/form/buttons/DeleteRecord';
import DuplicateRecord from '../../containers/form/buttons/DuplicateRecord';
import FieldGroup from '../../containers/form/FieldGroup';
import { GridContainer, GridItem } from '../../styles/Grid';
import Field from './Field';

let isWaitingForFrame = false;

const SideBar = styled.div`
	padding: 10px 10px;
	background: ${colors.backgroundDark};
	color: ${colors.white};
	
	label {
		color: ${colors.white};
	}

	.sticky & {
		position: fixed;
			top: 170px;
	}

	.absolute & {
		position: absolute;
			top: auto;
			bottom: 0;
	}
`;

export default class SingleRecord extends Component {
	state = {
		stickyState: 'relative',
		stickyWidth: 'auto',
	}

	static propTypes = {
		tableId: PropTypes.number,
		recordId: PropTypes.string,
		parentRecordId: PropTypes.string,
		activeGroup: PropTypes.object,
		parentTableId: PropTypes.number,
		isSubform: PropTypes.bool,
		isGod: PropTypes.bool,
		
		table: PropTypes.object,
		record: PropTypes.object,
		recordUnaltered: PropTypes.object,
		env: PropTypes.object,
		language: PropTypes.string,
		isRoot: PropTypes.bool,

		mainGroups: PropTypes.array,
		asideGroups: PropTypes.array,

		fetchTable: PropTypes.func,
		fetchRecord: PropTypes.func,
		setFieldVal: PropTypes.func,
		showFieldGroup: PropTypes.func,
		toggleFieldGroup: PropTypes.func,
	};

	componentDidMount() {
		this.requireData(this.props);
		window.addEventListener('scroll', this.stickySidebar);
	}
	
	componentWillUnmount() {
		window.removeEventListener('scroll', this.stickySidebar);
	}

	componentDidUpdate() {
		this.requireData(this.props);
	}	

	requireData(props) {
		const { tableId, recordId } = props;
		if (!props.table) this.props.fetchTable(tableId);

		if (recordId && !props.record) {
			this.props.fetchRecord(tableId, recordId);
		}
	}

	renderChild = (child) => {
		// console.log(child);
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

	stickySidebar = () => {
		if (!this.sidebar) return;
		if (!isWaitingForFrame) {
			isWaitingForFrame = true;
			requestAnimationFrame(this.doScrollHandler);
		}
	}

	doScrollHandler = () => {
		// isWaitingForFrame = false;
		// const parent = this.sidebar.parentNode;
		// const pos = parent.getBoundingClientRect();
		// const inner = this.sidebar.getBoundingClientRect();

		// if (pos.top <= 160 - pos.height + (inner.height + 20)) {
		// 	if (this.state.stickyState !== 'absolute') this.setState({ stickyState: 'absolute' });
		// 	this.sidebar.style.width = pos.width + 'px';
		// } else if (pos.top <= 160) {
		// 	if (this.state.stickyState !== 'sticky') this.setState({ stickyState: 'sticky' });
		// 	this.sidebar.style.width = pos.width + 'px';
		// } else if (this.state.stickyState !== 'relative') {
		// 	this.setState({ stickyState: 'relative' });
		// 	this.sidebar.style.width = 'auto';
		// }
	}

	renderField = (field, isAside = false) => {
		// if (field.subformPlaceholder) {
		// 	if (!isAside) {
		// 		const child = this.props.children.find(candidate => candidate.tableId === field.subformPlaceholder);
		// 		return this.renderChild(child);
		// 	}
		// 	return null;
		// }

		//if field is language-specific, display it only if the current language is the field's
		//or we may have a field that contains the language for the whole record. If so, and record is children, hide labguage field (it is preset at record creation)
		const isShowField = ((field.language && field.language === this.props.language) || !field.language) && (!this.props.isSubform || field.type !== TYPE_LANGUAGE);
		// console.log(field.name, isShowField);
		return isShowField ? (<Field
			key={field.id} 
			field={field}
			isAside={!!isAside}
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

	renderGroupTabs = (groups) => {
		const { activeGroup } = this.props;

		if (groups.length > 1) {
			return (<GridContainer key="tabs">
				<GridItem column="12">
					<TabsContainer className="tab-list">
						{groups.map((group) => {
							if (!group) return null;
							const isActive = activeGroup.key === group.key;
							// console.log(group);
							const label = group.label || 'Main Info';
							return ( 
								<SetVisibleTab 
									isActive={isActive}
									showFieldGroup={this.props.showFieldGroup}
									key={group.key}
									tableId={this.props.tableId}
									clickKey={group.key}
									label={label}
								/>
							);
						})}
					</TabsContainer>
				</GridItem>
			</GridContainer>);
		}
		return null;
	}

	renderGroups(groups, isAside, sidebar) {

		//subforms groups are rendered not tabbed, they are all displayed
		if (!this.props.isRoot || isAside) {
			return groups.map((group) => {
				//group is not a group of fields, it's only a placeholder to place a subform amongst main table's fields list.
				// console.log(group.fields);
				// console.log('rendering group...', group.label);
				// console.log(group);
				const groupFieldRows = group.fields && group.fields.map((field) => this.renderField(field, isAside)).filter(a => a);
				const groupChild = group.child && this.renderChild(group.child);
				// console.log(groupFieldRows, groupChild);
				if (groupFieldRows && groupFieldRows.length) {
					return (<FieldGroup key={group.key} id={group.key} label={group.label}>
						{groupFieldRows}
						{groupChild}
					</FieldGroup>);
				}
				//if only child form in the group, don't wrap it in the group (groups don't respond to hide/show rules)
				return groupChild;
			}, []);
		}

		//root is tabbed

		const { activeGroup } = this.props;
		// console.log(activeGroup.fields);
		const activeGroupFields = activeGroup && activeGroup.fields && activeGroup.fields.map((field) => this.renderField(field, 0)).filter(a => a);
		const activeGroupChild = activeGroup && activeGroup.child && this.renderChild(activeGroup.child);

		const tabs = this.renderGroupTabs(groups);

		let renderedGroup = (
			<FieldGroup key={activeGroup.key} id={activeGroup.key} isRoot label={activeGroup.label} hideHeading>
				{activeGroupFields}
				{activeGroupChild}
			</FieldGroup>
		);
		
		//if we show first group of root form and there is an aside, grid it to the right
		if (sidebar && this.props.isRoot && activeGroup.isFirst) {
			renderedGroup = (<GridContainer>
				<GridItem columns={8}>
					{renderedGroup}
				</GridItem>
				{sidebar}
			</GridContainer>);
		}

		return (<div>
			{tabs}
			{renderedGroup}
		</div>);

	}

	getSidebarRef = (ref) => {
		this.sidebar = ref;
	}

	render() {
		let form;

		// console.log('render', this.props.table.name);
		// console.log('render', this.props.table, this.props.record);
		if (this.props.table && this.props.record) {

			let deleteBtn;
			let duplicateBtn = null;
			if (!this.props.isRoot) {
				deleteBtn = (<DeleteRecord 
					tableId={this.props.table.id}
					recordId={this.props.recordId}
					language={this.props.table.hasLanguage ? this.props.language : null}
				/>);
				duplicateBtn = (<DuplicateRecord 
					table={this.props.table}
					tableId={this.props.table.id}
					recordId={this.props.recordId}
					parentRecordId={this.props.parentRecordId}
					parentTableId={this.props.parentTableId}
					language={this.props.table.hasLanguage ? this.props.language : null}
				/>);
			}


			let sidebar;
			//if there are fields in the aside, render them separately. In a subform, they are displayed directly in the grid, on the root form they are rendered in the first group
			if (this.props.asideGroups.length) {
				sidebar = (
					<GridItem columns="4" className={this.state.stickyState}>
						<SideBar ref={this.getSidebarRef} data-sidebar-inner>
							{this.renderGroups(this.props.asideGroups, true)}
						</SideBar>
					</GridItem>
				);
			}

			const recIdDisplay = this.props.isGod ? <small><em>Record id {this.props.recordId}</em></small> : '';


			form = (
				<article>
					<GridContainer>
						<GridItem columns="6">
							<StyledFieldGroup>{recIdDisplay}</StyledFieldGroup>
						</GridItem>
						<GridItem columns="6" justify="right">
							{duplicateBtn}
							{deleteBtn}
						</GridItem>
					</GridContainer>
					<GridContainer>
						<GridItem columns={`${sidebar && !this.props.isRoot ? 8 : 12}`}>
							{this.renderGroups(this.props.mainGroups, false, sidebar)}
						</GridItem>
						{!this.props.isRoot && sidebar}
					</GridContainer>
				</article>
			);

		}
		return (
			<StyledSingleRecord>
				{form}
			</StyledSingleRecord>
		);
	}
}

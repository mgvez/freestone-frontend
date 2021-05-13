import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TYPE_LANGUAGE, BANK_PATH_ALIAS } from '../../freestone/schemaProps';

import { StyledSingleRecord, TabsList, Aside, TabContentSection } from '../../styles/Form';
import { StyledFieldGroup } from '../../styles/Input';
import { Button } from '../../styles/Button';
import SetVisibleTab from './buttons/SetVisibleTab';
import RecordSlug from '../../containers/widgets/RecordSlug';

import Subform from '../../containers/form/subform/Subform';
import DeleteRecord from '../../containers/form/buttons/DeleteRecord';
import Changelog from '../../containers/changelog/Changelog';
import DuplicateRecord from '../../containers/form/buttons/DuplicateRecord';
import FieldGroup from '../../containers/form/FieldGroup';
import { GridContainer, GridItem } from '../../styles/Grid';
import Field from './Field';

export default class SingleRecord extends Component {
	state = {
		stickyState: 'relative',
		stickyWidth: 'auto',
	}

	static propTypes = {
		tableId: PropTypes.number,
		recordId: PropTypes.string,
		recordGUID: PropTypes.string,
		parentRecordId: PropTypes.string,
		activeGroup: PropTypes.object,
		parentTableId: PropTypes.number,
		isSubform: PropTypes.bool,
		isSidebarView: PropTypes.bool,
		isGod: PropTypes.bool,
		isNew: PropTypes.bool,
		isOneToOne: PropTypes.bool,
		
		table: PropTypes.object,
		record: PropTypes.object,
		recordUnaltered: PropTypes.object,
		slugWidgetData: PropTypes.object,
		env: PropTypes.object,
		language: PropTypes.string,
		isRoot: PropTypes.bool,
		preventDelete: PropTypes.bool,

		mainGroups: PropTypes.array,

		fetchTable: PropTypes.func,
		fetchRecord: PropTypes.func,
		setFieldVal: PropTypes.func,
		showFieldGroup: PropTypes.func,
		toggleFieldGroup: PropTypes.func,
		fetchChangelog: PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.state = {
			showChangelog: false,
		};
	}

	componentDidMount() {
		this.requireData(this.props);
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

	renderChildren = children => {
		return children && children.map(child => {
			return child.isDisplay ? (
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
		});
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
		return isShowField ? (<Field
			key={field.id} 
			field={field}
			isAside={!!isAside}
			tableName={this.props.table.name}
			recordId={this.props.recordId}
			val={this.props.record[field.id]}
			absolutePath={this.props.record[`${field.name}_${BANK_PATH_ALIAS}`]}
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
					<TabsList className="tab-list">
						{groups.map((group) => {
							if (!group) return null;
							const isActive = activeGroup.key === group.key;
							const label = group.label || 'Main Info';
							return ( 
								<SetVisibleTab 
									isActive={isActive}
									showFieldGroup={this.props.showFieldGroup}
									key={group.key}
									tableId={this.props.tableId}
									clickKey={group.key}
									isSeoMetadata={group.isSeoMetadata}
									label={label}
								/>
							);
						})}
					</TabsList>
				</GridItem>
			</GridContainer>);
		}
		return null;
	}


	renderGroups(groups) {

		let renderedTabs;
		let renderedGroup;
		let renderedSidebar;
		let sidebarFields;

		//subforms groups are rendered not tabbed, they are all displayed
		if (!this.props.isRoot) {
			renderedGroup = groups.map((group) => {
				//group is not a group of fields, it's only a placeholder to place a subform amongst main table's fields list.
				const groupFieldRows = group.fields && group.fields.map((field) => this.renderField(field, 0)).filter(a => a);
				const groupChildren = group.children && this.renderChildren(group.children);
				// console.log(group.key);
				if (groupFieldRows && groupFieldRows.length) {
					return (<FieldGroup key={group.key} id={group.key} label={group.label}>
						{groupFieldRows}
						{groupChildren}
					</FieldGroup>);
				}
				//if only child form in the group, don't wrap it in the group (groups don't respond to hide/show rules)
				return groupChildren;
			}, []);

			sidebarFields = groups.reduce((carry, group) => {
				return [
					...carry,
					...((group.asideFields && group.asideFields.map((field) => this.renderField(field, 0))) || []),
				];
			}, []).filter(a => a);

		} else {
			//root form (first level) has its fields tabbed, and can have aside fields
			const { activeGroup } = this.props;

			const activeGroupFields = activeGroup && activeGroup.fields && activeGroup.fields.map((field) => this.renderField(field, 0)).filter(a => a);
			const activeGroupChildren = activeGroup && activeGroup.children && this.renderChildren(activeGroup.children);
			sidebarFields = activeGroup && activeGroup.asideFields && activeGroup.asideFields.map((field) => this.renderField(field, true)).filter(a => a);

			renderedTabs = this.renderGroupTabs(groups);

			renderedGroup = (
				<FieldGroup key={activeGroup.key} id={activeGroup.key} isRoot label={activeGroup.label} hideHeading>
					{activeGroupFields}
					{activeGroupChildren}
				</FieldGroup>
			);
			
		}

		const hasSideBar = sidebarFields && sidebarFields.length;
		if (hasSideBar) {
			renderedSidebar = (
				<GridItem key="sidegroup" columns="4" className={this.state.stickyState}>
					<Aside ref={this.getSidebarRef} data-sidebar-inner>
						<FieldGroup>
							{sidebarFields}	
						</FieldGroup>
					</Aside>
				</GridItem>	
			);
		}

		return (
			<React.Fragment>
				{renderedTabs}
				<TabContentSection isSubform={this.props.isSubform} hasTopTabs={groups && groups.length > 1}>
					<GridContainer>
						<GridItem key="maingroup" columns={hasSideBar ? 8 : 12}>
							{renderedGroup}
						</GridItem>
						{renderedSidebar}
					</GridContainer>
				</TabContentSection>
			</React.Fragment>
		);

	}

	getSidebarRef = (ref) => {
		this.sidebar = ref;
	}

	toggleChangelog = () => {
		this.setState((state) => (
			{
				showChangelog: !state.showChangelog,
			}
		));
	}

	render() {
		let form;
		if (this.props.table && this.props.record) {

			if (this.state.showChangelog) {
				return (
					<Changelog tableId={this.props.tableId} recordId={this.props.recordId} onClose={this.toggleChangelog} />
				);
			}

			let deleteBtn;
			let duplicateBtn = null;
			if (!this.props.isRoot && !this.props.preventDelete) {
				deleteBtn = (<DeleteRecord 
					tableId={this.props.table.id}
					recordId={this.props.recordId}
					language={this.props.table.hasLanguage ? this.props.language : null}
				/>);
				if (!this.props.isOneToOne) {
					duplicateBtn = (<DuplicateRecord 
						table={this.props.table}
						tableId={this.props.table.id}
						recordId={this.props.recordId}
						parentRecordId={this.props.parentRecordId}
						parentTableId={this.props.parentTableId}
						language={this.props.table.hasLanguage ? this.props.language : null}
					/>);
				}
			}

			const recIdDisplay = this.props.isGod ? <small><em>Record id {this.props.recordId}</em></small> : '';
			const showChangelog = !this.props.isNew && <Button round small bordered info onClick={this.toggleChangelog}>Changelog</Button>;

			form = (
				<article>
					<GridContainer>
						<GridItem columns="6">
							<StyledFieldGroup>{recIdDisplay}</StyledFieldGroup>
						</GridItem>
						<GridItem columns="6" justify="right">
							{showChangelog}
							{duplicateBtn}
							{deleteBtn}
						</GridItem>
					</GridContainer>
					{<RecordSlug {...this.props.slugWidgetData} />}
					{this.renderGroups(this.props.mainGroups)}
				</article>
			);

		}
		return (
			<StyledSingleRecord isSubform={this.props.isSubform} isSidebarView={this.props.isSidebarView}>
				{form}
			</StyledSingleRecord>
		);
	}
}

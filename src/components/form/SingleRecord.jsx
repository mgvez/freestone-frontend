import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TYPE_LANGUAGE, BANK_PATH_ALIAS } from '../../freestone/SchemaProps';
import { StyledSingleRecord } from '../../styles/Form';

import Subform from '../../containers/form/subform/Subform';
import DeleteRecord from '../../containers/form/buttons/DeleteRecord';
import FieldGroup from '../../containers/form/FieldGroup';
import Field from './Field';

const GRID_COLUMNS = 12;

function wrapCurrentRow(all) {

	all.rows.push(<div className="row form-row" key={all.currentKey}>{all.currentRow}</div>);
	return all;
}

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
			<Subform
				key={child.tableId}
				tableId={child.tableId}
				titleOverride={child.titleOverride}
				descriptionAppend={child.descriptionAppend}
				parentTableId={this.props.table.id}
				parentRecordId={this.props.recordId}
				language={this.props.language}
			/>
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

	//Wrap fields in rows, depending on number of columns they fill. Row will be 12 cols max
	renderRows = (all, field) => {
		
		const renderedField = this.renderField(field, all.isAside);
		if (!renderedField) return all;

		const cols = Number(field.columns || GRID_COLUMNS);
		all.currentColumns += cols;
		//make new row
		if (all.currentColumns > GRID_COLUMNS) {
			wrapCurrentRow(all);
			all.currentColumns = cols;
			all.currentRow = [];
			all.currentKey = '';
		}
		all.currentKey += field.name;
		all.currentRow.push(renderedField);
		return all;
	}

	renderGroups(fields, isAside) {
		const fieldGroups = fields.map((group) => {
			
			const groupFieldRows = wrapCurrentRow(group.fields.reduce(this.renderRows, {
				rows: [],
				currentRow: [],
				currentColumns: 0,
				currentKey: '',
				isAside,
			})).rows;
			// console.log(groupFieldRows);
			// return this.createGroup(groupFieldRows, group.key, group.isPlaceholder, group.label);
			return <FieldGroup key={group.key} id={group.key} isPlaceholder={group.isPlaceholder} label={group.label}>{groupFieldRows}</FieldGroup>;
		}, []);
		// console.log(fieldGroups);
		return <div>{fieldGroups}</div>;
	}

	render() {
		let form;
		let sub;

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
					<div className="col-md-4">
						<div className="sidebar">
							{this.renderGroups(this.props.asideFields, true)}
						</div>
					</div>
				);
			}

			const subsiteField = null;//(this.props.isGod && this.props.table.isSubsiteDependent) ? <div>subsite</div> : null;

			const recIdDisplay = this.props.isGod ? <small><em>Record id {this.props.recordId}</em></small> : '';
			// const previewId = this.props.record[PREVIEWID_PSEUDOFIELD_ALIAS];
			// const previewIdDisplay = previewId ? <small><em>Preview {previewId}</em></small> : null;
			form = (
				<article>
					{subsiteField}
					<div className="row">
						<div className="col-md-6">
							{recIdDisplay}
						</div>
						<div className="col-md-6 close-row">
							{deleteBtn}
						</div>
					</div>
					<div className="row">
						<div className={`${sidebar ? 'col-md-8' : 'col-md-12'}`}>
							{this.renderGroups(this.props.mainFields)}
						</div>
						{sidebar}
					</div>
				</article>
			);

			//shows child forms that are not previously placed through a placeholder
			if (this.props.children) {
				sub = (
					<div>
						{this.props.children.map(child => (!child.hasPlaceholder || null) && this.renderChild(child))}
					</div>
				);

			}
		}
		return (
			<StyledSingleRecord className={this.props.isRoot && 'root'}>
				{form}
				{sub}
			</StyledSingleRecord>
		);
	}
}

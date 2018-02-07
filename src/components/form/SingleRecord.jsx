import React, { Component } from 'react';

import { TYPE_LANGUAGE, BANK_FILE_PATH_ALIAS } from '../../freestone/schemaProps';

import Subform from '../../containers/form/subform/Subform';
import DeleteRecord from '../../containers/form/buttons/DeleteRecord';
import Field from './Field';

const GRID_COLUMNS = 12;

export default class SingleRecord extends Component {
	static propTypes = {
		tableId: React.PropTypes.number,
		recordId: React.PropTypes.string,
		parentRecordId: React.PropTypes.string,
		parentTableId: React.PropTypes.number,
		isSubform: React.PropTypes.bool,
		isGod: React.PropTypes.bool,
		
		table: React.PropTypes.object,
		children: React.PropTypes.array,
		record: React.PropTypes.object,
		recordUnaltered: React.PropTypes.object,
		fields: React.PropTypes.array,
		env: React.PropTypes.object,
		language: React.PropTypes.string,
		isRoot: React.PropTypes.bool,

		fetchTable: React.PropTypes.func,
		fetchRecord: React.PropTypes.func,
		setFieldVal: React.PropTypes.func,
	};

	componentWillMount() {
		this.requireData(this.props);
	}

	componentWillReceiveProps(nextProps) {
		// console.log('receive', nextProps.table.id, nextProps.table === this.props.table);
		this.requireData(nextProps);
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
				return this.renderChild(child);
			}
			
			return null;
		}

		//if field is language-specific, display it only if the current language is the field's
		// console.log(field.name, field.language, this.props.language);
		//or we may have a field that contains the language for the whole record. If so, and record is children, hide labguage field (it is preset at record creation)
		const isShowField = ((field.language && field.language === this.props.language) || !field.language) && (!this.props.isSubform || field.type !== TYPE_LANGUAGE);
		// console.log(this.props.record);
		return isShowField ? (<Field
			key={field.id} 
			field={field}
			tableName={this.props.table.name}
			recordId={this.props.recordId}
			val={this.props.record[field.id]}
			absolutePath={this.props.record[`${field.id}${BANK_FILE_PATH_ALIAS}`]}
			origVal={this.props.recordUnaltered[field.id]}
			parentRecordId={this.props.parentRecordId}
			setFieldVal={this.props.setFieldVal}
			env={this.props.env}
			lang={field.language}
			isRoot={this.props.isRoot}
		/>) : null;
	}

	wrapRow(all) {
		all.rows.push(<div className="row" key={all.currentKey}>{all.currentRow}</div>);
		return all;
	}

	//Wrap fields in rows, depending on number of columns they fill. Row will be 12 cols max
	renderRows = (all, field) => {
		
		const renderedField = this.renderField(field, all.isAside);
		if (!renderedField) return all;

		const cols = Number(field.columns || GRID_COLUMNS);
		all.currentColumns += cols;
		console.log(field.name, cols, all.currentColumns);
		//make new row
		if (all.currentColumns > GRID_COLUMNS) {
			this.wrapRow(all);
			all.currentColumns = cols;
			all.currentRow = [];
			all.currentKey = '';
		}
		all.currentKey += field.name;
		all.currentRow.push(renderedField);
		return all;
	}

	renderFields = (fields, isAside) => {
		return this.wrapRow(fields.reduce(this.renderRows, {
			rows: [],
			currentRow: [],
			currentColumns: 0,
			currentKey: '',
			isAside,
		})).rows;
	}

	render() {
		let form;
		let sub;

		// console.log('render', this.props.table.name);
		// console.log('render', this.props.table);
		if (this.props.table && this.props.record) {

			let deleteBtn;
			if (!this.props.isRoot) {
				deleteBtn = (<DeleteRecord 
					tableId={this.props.table.id}
					recordId={this.props.recordId}
					language={this.props.table.hasLanguage ? this.props.language : null}
				/>);
			}

			const secondaryFields = this.props.fields.filter(f => f.isSecondary);
			const normalFields = this.props.fields.filter(f => !f.isSecondary);

			let sidebar;
			if (secondaryFields.length > 0) {
				sidebar = (
					<div className="col-md-4">
						<div className="sidebar">
							{
								this.renderFields(secondaryFields, false)
							}
						</div>
					</div>
				);
			}

			const subsiteField = null;//(this.props.isGod && this.props.table.isSubsiteDependent) ? <div>subsite</div> : null;

			form = (
				<article>
					{subsiteField}
					<div className="row">
						<div className="col-md-12 close-row">
							{deleteBtn}
						</div>
					</div>
					<div className="row">
						<div className={`${sidebar ? 'col-md-8' : 'col-md-12'}`}>
							{
								this.renderFields(normalFields)
							}
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
			<section className="single-record">
				{form}
				{sub}
			</section>
		);
	}
}

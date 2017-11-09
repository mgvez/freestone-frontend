import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchTable } from '../../actions/schema';
import { fetchRecord, setFieldVal } from '../../actions/record';
import { TYPE_LANGUAGE } from '../../freestone/schemaProps';

import { formRecordMapStateToProps } from '../../selectors/formRecord';

import { Subform } from './subform/Subform';
import { Field } from './Field';
import { DeleteRecord } from './buttons/DeleteRecord';

@connect(
	formRecordMapStateToProps,
	dispatch => bindActionCreators({ fetchTable, fetchRecord, setFieldVal }, dispatch)
)
export class SingleRecord extends Component {
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

	renderField = (field, canBeSubform = true) => {
		if (field.subformPlaceholder) {
			if (canBeSubform) {
				const child = this.props.children.find(candidate => candidate.tableId === field.subformPlaceholder);
				return this.renderChild(child);
			}
			
			return false;
		}

		//if field is language-specific, display it only if the current language is the field's
		// console.log(field.name, field.language, this.props.language);
		//or we may have a field that contains the language for the whole record. If so, and record is children, hide labguage field (it is preset at record creation)
		const isShowField = ((field.language && field.language === this.props.language) || !field.language) && (!this.props.isSubform || field.type !== TYPE_LANGUAGE);

		return isShowField ? (<Field
			key={field.id} 
			field={field}
			tableName={this.props.table.name}
			recordId={this.props.recordId}
			val={this.props.record[field.id]}
			origVal={this.props.recordUnaltered[field.id]}
			parentRecordId={this.props.parentRecordId}
			setFieldVal={this.props.setFieldVal}
			env={this.props.env}
			lang={field.language}
			isRoot={this.props.isRoot}
		/>) : null;
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
								secondaryFields.map(f => this.renderField(f, false))
							}
						</div>
					</div>
				);
			}

			const subsiteField = (this.props.isGod && this.props.table.isSubsiteDependent) ? <div>subsite</div> : null;

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
								normalFields.map(this.renderField)
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

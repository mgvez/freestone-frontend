import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as schemaActionCreators from 'actions/schema';
import * as recordActionCreators from 'actions/record';

import { formRecordMapStateToProps } from 'selectors/formRecord';

import { Subform } from 'components/connected/form/Subform';
import { Field } from 'components/static/form/Field';
import { DeleteRecord } from 'components/connected/form/buttons/DeleteRecord';

@connect(
	formRecordMapStateToProps,
	dispatch => bindActionCreators({ ...schemaActionCreators, ...recordActionCreators }, dispatch)
)
export class SingleRecord extends Component {
	static propTypes = {
		tableName: React.PropTypes.string,
		recordId: React.PropTypes.string,

		table: React.PropTypes.object,
		children: React.PropTypes.array,
		record: React.PropTypes.object,
		recordUnaltered: React.PropTypes.object,
		fields: React.PropTypes.array,
		env: React.PropTypes.object,
		language: React.PropTypes.string,
		
		fetchTable: React.PropTypes.func,
		fetchRecord: React.PropTypes.func,
		setFieldVal: React.PropTypes.func,
	};

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.requireData(this.props);
	}

	componentWillReceiveProps(nextProps) {
		// console.log('receive', nextProps.table.id, nextProps.table === this.props.table);
		this.requireData(nextProps);
	}

	// shouldComponentUpdate(nextProps) {
	// 	console.log('should ', nextProps.table.id, nextProps.table === this.props.table);
	// 	return true;
	// 	//return nextProps.id !== this.props.id;
	// }

	requireData(props) {
		const { tableName, recordId } = props;
		// console.log(props.recordId);
		if (!props.table) this.props.fetchTable(tableName);
		// console.log(`fetch record ${tableName}.${recordId}`);

		if (recordId && !props.record) {
			this.props.fetchRecord(tableName, recordId);
		}
	}

	render() {
		let form;
		let sub;


		// console.log('render', this.props.children);
		if (this.props.table && this.props.record) {

			form = (
				<article>
					<DeleteRecord 
						tableId={this.props.table.id}
						recordId={this.props.recordId}
					/>
					{
						this.props.fields.map((field) => {

							if (field.subformPlaceholder) {
								return (
									<Subform
										key={field.subformPlaceholder}
										tableId={field.subformPlaceholder}
										parentTableId={this.props.table.id}
										parentRecordId={this.props.recordId}
									/>
								);
							}

							//if field is language-specific, display it only if the current language is the field's
							return ((field.language && field.language === this.props.language) || !field.language) ? (<Field
								key={field.id} 
								field={field}
								tableName={this.props.table.name}
								recordId={this.props.recordId}
								val={this.props.record[field.id]}
								origVal={this.props.recordUnaltered[field.id]}
								setFieldVal={this.props.setFieldVal}
								env={this.props.env}
							/>) : null;
						})
					}
				</article>
			);
			if (this.props.children) {

				sub = (
					<div>
						{
							this.props.children.map((tableId) => {
								return (
									<Subform
										key={tableId}
										tableId={tableId}
										parentTableId={this.props.table.id}
										parentRecordId={this.props.recordId}
									/>
								);
							})
						}
					</div>
				);

			}
		}
		return (
			<section className="single-record">
				{ form }
				{ sub }
			</section>
		);
	}
}

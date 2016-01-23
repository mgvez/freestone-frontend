import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as schemaActionCreators from 'actions/schema';
import * as recordActionCreators from 'actions/record';

import { Heading } from 'components/RecordList/Heading';

@connect(
	state => { return { ...state.schema, ...state.recordList }; },
	dispatch => bindActionCreators({ ...schemaActionCreators, ...recordActionCreators }, dispatch)
)
export class List extends Component {
	static propTypes = {
		params: React.PropTypes.object,
		tables: React.PropTypes.object,
		fields: React.PropTypes.object,
		records: React.PropTypes.array,
		table: React.PropTypes.string,
		fetchTable: React.PropTypes.func,
		fetchList: React.PropTypes.func,
	};

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.requireTable(this.props);
		this.requireRecords(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.requireTable(nextProps);
		this.requireRecords(nextProps);
	}

	requireTable(props) {
		const { tableName } = props.params;
		// console.log(props.tables, tableName);
		if (tableName && !props.tables[tableName]) {
			this.props.fetchTable(tableName);
		}
	}

	requireRecords(props) {
		console.log(props);
		const { tableName } = props.params;
		if (tableName && props.table !== tableName) {
			this.props.fetchList(tableName);
		} 
		// const { tableName } = props.params;
		// if (!props.records.length) {
		// 	this.props.fetchList(tableName, 0, 0);
		// }
	}

	render() {
		const { tableName } = this.props.params;
		const table = this.props.tables[tableName];
		// console.log(table);
		let recordList;
		if (table) {

			const searchableFields = Object.keys(this.props.fields).map(fieldId => {
				return this.props.fields[fieldId];
			}).filter(field => {
				return field.isSearch && field.table_id === table.id;
			});
			console.log(this.props.records);

			recordList = (
				<div>
					<h1>List records from {this.props.params.name}</h1>
					<h2>{table.actionLabel}</h2>
					<table className="table">
						<tbody>
							<Heading fields={searchableFields} />
						</tbody>
					</table>
				</div>
			);
		}
		return (
			<section>
				{ recordList }
			</section>
		);
	}
}

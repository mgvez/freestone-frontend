import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as schemaActionCreators from 'actions/schema';
import * as recordActionCreators from 'actions/record';

import { Heading } from 'components/RecordList/Heading';
import { Row } from 'components/RecordList/Row';

import { listSchemaSelector } from 'selectors/ListSchema';
import { listRecordsSelector } from 'selectors/ListRecords';

const attempts = {
	records: 0,
	schema: 0,
};
const MAX_ATTEMPTS = 3;

@connect(
	(state, props) => {
		return {
			...listSchemaSelector(state, props),
			records: listRecordsSelector(state, props),
		};
	},
	dispatch => bindActionCreators({ ...schemaActionCreators, ...recordActionCreators }, dispatch)
)
export class List extends Component {
	static propTypes = {
		params: React.PropTypes.object,
		fetchTable: React.PropTypes.func,
		fetchList: React.PropTypes.func,
		table: React.PropTypes.object,
		searchableFields: React.PropTypes.array,
		records: React.PropTypes.array,
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
		attempts.schema++;
		const { tableName } = props.params;
		// console.log(props.table, tableName);
		if (!props.table) {
			if (attempts.schema < MAX_ATTEMPTS) this.props.fetchTable(tableName);
		} else {
			attempts.schema = 0;
		}
	}

	requireRecords(props) {
		// console.log(props.records);
		attempts.records++;

		const { tableName } = props.params;
		if (!props.records) {
			// console.log('require records ' + tableName);
			if (attempts.records < MAX_ATTEMPTS) this.props.fetchList(tableName);
		} else {
			attempts.records = 0;
		}
	}

	render() {
		// console.log(table);
		let output;
		if (this.props.table && this.props.records) {

			output = (
				<div>
					<h1>List records from {this.props.params.name} {this.props.table.actionLabel}</h1>
					<table className="table">
						<tbody>
							<Heading fields={this.props.searchableFields} />
							{
								this.props.records.map((record, idx) => {
									return <Row key={idx} fields={this.props.searchableFields} values={record} table={this.props.table} />;
								})
							}
						</tbody>
					</table>
				</div>
			);
		}
		return (
			<section>
				{ output }
			</section>
		);
	}
}

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as schemaActionCreators from 'actions/schema';
import * as recordActionCreators from 'actions/record';


@connect(
	state => { return { ...state.schema, ...state.records }; },
	dispatch => bindActionCreators({ ...schemaActionCreators, ...recordActionCreators }, dispatch)
)
export class RootForm extends Component {
	static propTypes = {
		params: React.PropTypes.object,
		tables: React.PropTypes.object,
		fields: React.PropTypes.object,
		records: React.PropTypes.array,
		table: React.PropTypes.string,
		fetchTable: React.PropTypes.func,
		fetchRecord: React.PropTypes.func,
	};

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.requireTable(this.props);
		this.requireRecord(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.requireTable(nextProps);
		this.requireRecord(nextProps);
	}

	requireTable(props) {
		const { tableName } = props.params;
		// console.log(props.tables, tableName);
		if (tableName && !props.tables[tableName]) {
			this.props.fetchTable(tableName);
		}
	}

	requireRecord(props) {
		console.log(props);
		const { tableName, recordId } = props.params;
		if (tableName && props.table !== tableName && recordId) {
			this.props.fetchRecord(tableName, recordId);
		}
	}

	render() {
		const { tableName } = this.props.params;
		const table = this.props.tables[tableName];
		console.log(table);
		let output;
		if (table) {
			output = (
				<div>{tableName}</div>
			);
		}
		return (
			<section>
				{ output }
			</section>
		);
	}
}

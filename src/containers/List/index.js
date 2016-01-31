import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as schemaActionCreators from 'actions/schema';
import * as recordActionCreators from 'actions/record';

import { Heading } from 'components/RecordList/Heading';
import { Row } from 'components/RecordList/Row';
import { RequireApiData } from 'containers/common/RequireApiData';

import { listSchemaSelector } from 'selectors/ListSchema';
import { listRecordsSelector } from 'selectors/ListRecords';

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
		this.requireDataCtrl = new RequireApiData;
	}

	componentWillMount() {
		this.requireData(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.requireData(nextProps);
	}

	requireData(props) {
		const { tableName } = props.params;

		this.requireDataCtrl.requireProp('table', props, this.props.fetchTable, [tableName]);
		this.requireDataCtrl.requireProp('records', props, this.props.fetchList, [tableName]);
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

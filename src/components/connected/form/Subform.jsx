import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchTable } from 'actions/schema';
import { tableSchemaMapStateToProps } from 'selectors/tableSchema';

import { SubformMtm } from 'components/connected/form/SubformMtm';
import { SubformStandard } from 'components/connected/form/SubformStandard';

import { TYPE_MTM } from 'freestone/schemaProps';


@connect(
	tableSchemaMapStateToProps,
	dispatch => bindActionCreators({ fetchTable }, dispatch)
)
export class Subform extends Component {
	static propTypes = {
		tableId: React.PropTypes.number,
		parentTableId: React.PropTypes.number,
		parentRecordId: React.PropTypes.string,
		language: React.PropTypes.string,

		table: React.PropTypes.object,
		fetchTable: React.PropTypes.func,
	};

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.requireData(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.requireData(nextProps);
	}

	requireData(props) {
		// console.log(props);
		const { tableId } = props;
		if (!props.table) this.props.fetchTable(tableId);
	}

	render() {
		if (!this.props.table) return null;

		if (this.props.table.type === TYPE_MTM) {
			return (<SubformMtm
				tableId={this.props.tableId}
				parentRecordId={this.props.parentRecordId}
				parentTableId={this.props.parentTableId}
			/>);
		}
		
		return (<SubformStandard
			tableId={this.props.tableId}
			parentRecordId={this.props.parentRecordId}
			parentTableId={this.props.parentTableId}
			language={this.props.language}
		/>);
		
	}
}

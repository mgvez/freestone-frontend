import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchTable } from 'actions/schema';
import { tableSchemaMapStateToProps } from 'selectors/tableSchema';

import { RequireApiData } from 'utils/RequireApiData';

import { SubformMtm } from 'components/connected/form/SubformMtm';
import { Subform } from 'components/connected/form/Subform';

import { TYPE_MTM } from 'freestone/schemaProps';


@connect(
	tableSchemaMapStateToProps,
	dispatch => bindActionCreators({ fetchTable }, dispatch)
)
export class Children extends Component {
	static propTypes = {
		tableId: React.PropTypes.number,
		parentTableId: React.PropTypes.number,
		parentRecordId: React.PropTypes.string,

		table: React.PropTypes.object,
		fetchTable: React.PropTypes.func,
	};

	constructor(props) {
		super(props);
		// console.log(props);
		this.requireDataCtrl = new RequireApiData;
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
		this.requireDataCtrl.requireProp('table', props, this.props.fetchTable, [tableId]);
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
		
		return (<Subform
			tableId={this.props.tableId}
			parentRecordId={this.props.parentRecordId}
			parentTableId={this.props.parentTableId}
		/>);
		
	}
}

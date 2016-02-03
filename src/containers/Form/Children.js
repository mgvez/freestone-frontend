import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as schemaActionCreators from 'actions/schema';
import * as recordActionCreators from 'actions/record';

import { formSchemaSelector } from 'selectors/FormSchema';
import { formChildrenRecordsSelector } from 'selectors/FormChildrenRecords';

import { RequireApiData } from 'containers/common/RequireApiData';

@connect(
	(state, props) => {
		return {
			...formSchemaSelector(state, props),
			childrenRecords: formChildrenRecordsSelector(state, props),
		};
	},
	dispatch => bindActionCreators({ ...schemaActionCreators, ...recordActionCreators }, dispatch)
)
export class Children extends Component {
	static propTypes = {
		tableId: React.PropTypes.number,
		parentTableName: React.PropTypes.string,
		parentRecordId: React.PropTypes.string,

		childrenRecords: React.PropTypes.array,
		table: React.PropTypes.object,

		fetchTable: React.PropTypes.func,
		fetchRecord: React.PropTypes.func,
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
		const { tableId, parentRecordId, parentTableName } = props;
		this.requireDataCtrl.requireProp('table', props, this.props.fetchTable, [tableId]);
		if (props.table) {
			const tableName = this.props.table.name;
			this.requireDataCtrl.requireProp('childrenRecords', props, this.props.fetchRecord, [tableName, parentRecordId, parentTableName]);

		}
	}

	render() {
		let header;
		if (this.props.table) {
			header = (
				<header>
					<h1>{this.props.table.displayLabel}</h1>
					<div>{this.props.table.help}</div>
				</header>
			);
		}
		return (
			<section>
				{ header }
			</section>
		);
	}
}

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as schemaActionCreators from 'actions/schema';
import * as recordActionCreators from 'actions/record';

import { formChildrenRecordsSelector } from 'selectors/FormChildrenRecords';

import { RequireApiData } from 'utils/RequireApiData';
import { SingleRecord } from 'containers/Form/SingleRecord';
import { Tab } from 'components/Form/Tab';

import createRecord from 'freestone/createRecord';

@connect(
	formChildrenRecordsSelector,
	dispatch => bindActionCreators({ ...schemaActionCreators, ...recordActionCreators }, dispatch)
)
export class Children extends Component {
	static propTypes = {
		tableId: React.PropTypes.number,
		parentTableId: React.PropTypes.number,
		parentRecordId: React.PropTypes.string,

		childrenRecords: React.PropTypes.array,
		activeRecord: React.PropTypes.string,
		table: React.PropTypes.object,
		newRecord: React.PropTypes.object,

		fetchTable: React.PropTypes.func,
		fetchRecord: React.PropTypes.func,
		setShownRecord: React.PropTypes.func,
		addRecord: React.PropTypes.func,
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
		const { tableId, parentRecordId, parentTableId } = props;
		this.requireDataCtrl.requireProp('table', props, this.props.fetchTable, [tableId]);
		if (props.table) {
			const tableName = this.props.table.name;
			this.requireDataCtrl.requireProp('childrenRecords', props, this.props.fetchRecord, [tableName, parentRecordId, parentTableId]);

		}
	}

	addRecord = () => {
		// console.log(this.props.table);
		const { newRecord, newRecordId } = createRecord(this.props.table, this.props.parentTableId, this.props.parentRecordId);
		
		// console.log(newRecord);
		this.props.addRecord(this.props.table.id, newRecord);
		this.props.setShownRecord(this.props.table.id, this.props.parentRecordId, newRecordId);
	};

	render() {
		let header;
		if (this.props.table) {
			header = (
				<header>
					<h1>{this.props.table.displayLabel}</h1>
					<div>{this.props.table.help}</div>
					<button className="btn btn-sm btn-default" onClick={this.addRecord}>Add record</button>
				</header>
			);
		}
		let tabs;
		let form;
		if (this.props.childrenRecords) {
			const activeRecord = this.props.childrenRecords.find(rec => rec.id === this.props.activeRecord) || this.props.childrenRecords[0];
			const activeRecordId = activeRecord && activeRecord.id;
			tabs = (
				<div>
					{
						this.props.childrenRecords.map((record, index) => {
							const active = record.id === activeRecordId;
							return (<Tab 
								key={record.id}
								displayLabel={record.label}
								isActive={active}
								recordId={record.id}
								index={index}
								tableId={this.props.table.id}
								parentRecordId={this.props.parentRecordId}
								setShownRecord={this.props.setShownRecord}
							/>);
						})
					}
				</div>
			);
			form = (
				<SingleRecord tableName={this.props.table.name} recordId={activeRecordId} />
			);
		}
		return (
			<section>
				{ header }
				{ tabs }
				{ form }
			</section>
		);
	}
}

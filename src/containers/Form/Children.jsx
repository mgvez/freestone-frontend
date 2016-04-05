import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import update from 'react/lib/update';


import * as schemaActionCreators from 'actions/schema';
import * as recordActionCreators from 'actions/record';

import { formChildrenRecordsSelector } from 'selectors/FormChildrenRecords';

import { RequireApiData } from 'utils/RequireApiData';
import { SingleRecord } from 'containers/Form/SingleRecord';
import { Tab } from 'components/Form/Tab';

import createRecord from 'freestone/createRecord';


import { DragDropContext as dragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

@connect(
	formChildrenRecordsSelector,
	dispatch => bindActionCreators({ ...schemaActionCreators, ...recordActionCreators }, dispatch)
)
@dragDropContext(HTML5Backend)
export class Children extends Component {
	static propTypes = {
		tableId: React.PropTypes.number,
		parentTableId: React.PropTypes.number,
		parentRecordId: React.PropTypes.string,

		childrenRecords: React.PropTypes.array,
		activeRecord: React.PropTypes.object,
		table: React.PropTypes.object,
		newRecord: React.PropTypes.object,

		fetchTable: React.PropTypes.func,
		fetchRecord: React.PropTypes.func,
		setShownRecord: React.PropTypes.func,
		addRecord: React.PropTypes.func,
		setRecordDeleted: React.PropTypes.func,
		setOrder: React.PropTypes.func,
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

	deleteRecord = () => {
		// console.log(newRecord);
		this.props.setRecordDeleted(this.props.table.id, this.props.activeRecord && this.props.activeRecord.id);
		this.props.setShownRecord(this.props.table.id, this.props.parentRecordId, null);
	};

	swapRecords = (originId, targetId) => {
		const orderFieldId = this.props.table.orderField && this.props.table.orderField.id;
		if (!orderFieldId) return;

		const originIdx = this.props.childrenRecords.findIndex(el => el.id === originId);
		const targetIdx = this.props.childrenRecords.findIndex(el => el.id === targetId);

		const item = this.props.childrenRecords[originIdx];
		const dest = [
			...this.props.childrenRecords.slice(0, originIdx),
			...this.props.childrenRecords.slice(+originIdx + 1),
		];
		dest.splice(targetIdx, 0, item);

		this.props.setOrder(this.props.tableId, orderFieldId, dest);
		// console.log(this.props.childrenRecords);
		// console.log(dest);
	};

	render() {
		let header;
		
		const activeRecordId = this.props.activeRecord && this.props.activeRecord.id;

		if (this.props.table) {
			let deleteBtn;
			if (activeRecordId) {
				deleteBtn = (
					<button className="btn btn-sm btn-warning" onClick={this.deleteRecord}>Delete record</button>
				);
			}
			header = (
				<header>
					<h1>{this.props.table.displayLabel}</h1>
					<div>{this.props.table.help}</div>
					<button className="btn btn-sm btn-default" onClick={this.addRecord}>Add record</button>
					{deleteBtn}
				</header>
			);
		}
		let tabs;
		let form;
		if (this.props.childrenRecords) {
			tabs = (
				<div>
					{
						this.props.childrenRecords.map((record, index) => {
							const active = record.id === activeRecordId;
							return (<Tab 
								key={record.id}
								displayLabel={record.label}
								order={record.order}
								isActive={active}
								recordId={record.id}
								index={index}
								tableId={this.props.table.id}
								parentRecordId={this.props.parentRecordId}
								setShownRecord={this.props.setShownRecord}
								swapRecords={this.swapRecords}
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

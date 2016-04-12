import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as schemaActionCreators from 'actions/schema';
import * as recordActionCreators from 'actions/record';

import { formChildrenRecordsSelector } from 'selectors/formChildrenRecords';

import { RequireApiData } from 'utils/RequireApiData';
import createRecord from 'freestone/createRecord';

import { Header } from 'components/Form/Header';
import { SubformTabbed } from 'components/Form/SubformTabbed';
import { SubformMtm } from 'components/Form/SubformMtm';
import { SingleRecord } from 'containers/Form/SingleRecord';


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
		activeRecord: React.PropTypes.object,
		table: React.PropTypes.object,
		type: React.PropTypes.string,

		setShownRecord: React.PropTypes.func,
		fetchTable: React.PropTypes.func,
		fetchRecord: React.PropTypes.func,
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
		//si field order, ajoute à la fin
		let order;
		if (this.props.table.orderField) {
			order = this.props.childrenRecords.reduce((highest, record) => {
				return record.order > highest ? record.order : highest;
			}, 0) + 10;
		}

		const { newRecord, newRecordId } = createRecord(this.props.table, this.props.parentTableId, this.props.parentRecordId, order);
		
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
		
		const activeRecordId = this.props.activeRecord && this.props.activeRecord.id;

		let form;
		let hasAddButton = true;
		let hasDeleteButton = true;
		if (this.props.childrenRecords && this.props.type === 'rel') {
			hasAddButton = true;
			hasDeleteButton = true;

			form = (<SubformTabbed 
				table={this.props.table}
				activeRecord={this.props.activeRecord}
				parentRecordId={this.props.parentRecordId}
				swapRecords={this.swapRecords}
				setShownRecord={this.props.setShownRecord}
				childrenRecords={this.props.childrenRecords}
			/>);

		} else if (this.props.type === 'mtm') {

			hasAddButton = hasDeleteButton = false;
			form = (<SubformMtm 
				table={this.props.table}
				parentRecordId={this.props.parentRecordId}
				childrenRecords={this.props.childrenRecords}
			/>);

		} else if (this.props.childrenRecords && this.props.type === 'oto') {
			
			hasAddButton = !this.props.childrenRecords.length;
			hasDeleteButton = true;
			form = <SingleRecord tableName={this.props.table.name} recordId={activeRecordId} />;

		}

		return (
			<section>
				<Header table={this.props.table} deleteRecord={this.deleteRecord} addRecord={this.addRecord} activeRecordId={activeRecordId} hasAddButton={hasAddButton} hasDeleteButton={hasDeleteButton} />
				{ form }
			</section>
		);
	}
}

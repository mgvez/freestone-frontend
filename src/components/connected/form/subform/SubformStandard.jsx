import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { formChildrenRecordsMapStateToProps } from 'selectors/formChildrenRecords';
import * as recordActionCreators from 'actions/record';
import { fetchTable } from 'actions/schema';

import { SubformTabbed } from 'components/static/form/subform/SubformTabbed';
import { SubformList } from 'components/static/form/subform/SubformList';
import { SubformSingle } from 'components/static/form/subform/SubformSingle';

import { TYPE_REL, TYPE_OTO } from 'freestone/schemaProps';
import { SUBFORM_VIEW_TABBED, SUBFORM_VIEW_LIST } from 'freestone/schemaProps';

@connect(
	formChildrenRecordsMapStateToProps,
	dispatch => bindActionCreators({ ...recordActionCreators, fetchTable }, dispatch)
)
export class SubformStandard extends Component {
	static propTypes = {
		tableId: React.PropTypes.number,
		table: React.PropTypes.object,
		activeRecord: React.PropTypes.object,
		childrenRecords: React.PropTypes.array,
		parentTableId: React.PropTypes.number,
		parentRecordId: React.PropTypes.string,
		highestOrder: React.PropTypes.number,
		currentViewType: React.PropTypes.string,
		language: React.PropTypes.string,
		isCollapsed: React.PropTypes.bool,
		
		fetchTable: React.PropTypes.func,
		fetchRecord: React.PropTypes.func,
		setOrder: React.PropTypes.func,
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
		const { tableId, parentRecordId, parentTableId } = props;
		if (!props.table) {
			this.props.fetchTable(tableId);
		} else {
			const tableName = props.table.name;
			if (!props.childrenRecords) {
				// console.log(`fetch record ${tableName}.${parentRecordId}`);
				this.props.fetchRecord(tableName, parentRecordId, parentTableId);
			}
		}
	}

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

		this.props.setOrder(this.props.table.id, orderFieldId, dest);
		// console.log(this.props.childrenRecords);
		// console.log(dest);
	};

	render() {
		// console.log(this.props.table);

		if (!this.props.table) return null;

		if (this.props.table.type === TYPE_REL) {
			if (this.props.currentViewType === SUBFORM_VIEW_TABBED || !this.props.currentViewType) {
				return <SubformTabbed {...this.props} swapRecords={this.swapRecords} />;
			}
			return <SubformList {...this.props} swapRecords={this.swapRecords} />;

		} else if (this.props.table.type === TYPE_OTO) {
			return <SubformSingle {...this.props} />;
		}
	}
}

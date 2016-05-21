import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { RequireApiData } from 'utils/RequireApiData';

import { formChildrenRecordsMapStateToProps } from 'selectors/formChildrenRecords';
import * as recordActionCreators from 'actions/record';
import { fetchTable } from 'actions/schema';

import { SubformTabbed } from 'components/static/form/SubformTabbed';
import { SubformSingle } from 'components/static/form/SubformSingle';

import { TYPE_REL, TYPE_OTO } from 'freestone/schemaProps';


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
		
		fetchTable: React.PropTypes.func,
		fetchRecord: React.PropTypes.func,
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
			const tableName = props.table.name;
			// console.log(tableName);
			this.requireDataCtrl.requireProp('childrenRecords', props, this.props.fetchRecord, [tableName, parentRecordId, parentTableId]);
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
		if (!this.props.table) return null;

		if (this.props.table.type === TYPE_REL) {
			return <SubformTabbed {...this.props} swapRecords={this.swapRecords} />;
		} else if (this.props.table.type === TYPE_OTO) {
			return <SubformSingle {...this.props} />;
		}
	}
}

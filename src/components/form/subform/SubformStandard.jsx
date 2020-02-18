import React, { Component } from 'react';
import PropTypes from 'prop-types';


import SubformTabbed from './SubformTabbed';
import SubformStacked from './SubformStacked';
import SubformList from './SubformList';
import SubformSingle from './SubformSingle';

import { SUBFORM_VIEW_TABBED, SUBFORM_VIEW_LIST, SUBFORM_VIEW_STACKED, TYPE_SUBFORM, TYPE_OTO } from '../../../freestone/schemaProps';

export default class SubformStandard extends Component {
	static propTypes = {
		tableId: PropTypes.number,
		table: PropTypes.object,
		activeRecord: PropTypes.object,
		childrenRecords: PropTypes.array,
		parentTableId: PropTypes.number,
		parentRecordId: PropTypes.string,
		highestOrder: PropTypes.number,
		currentViewType: PropTypes.string,
		defaultViewType: PropTypes.string,
		language: PropTypes.string,
		isCollapsed: PropTypes.bool,
		titleOverride: PropTypes.string,
		descriptionAppend: PropTypes.string,
		
		fetchTable: PropTypes.func,
		fetchRecord: PropTypes.func,
		setOrder: PropTypes.func,
		setShownRecord: PropTypes.func,
		changeCollapsedState: PropTypes.func,
	};

	componentDidMount() {
		this.requireData(this.props);
	}

	componentDidUpdate() {
		this.requireData(this.props);
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
		if (this.props.table.type === TYPE_SUBFORM) {
			const currentViewType = this.props.currentViewType || this.props.defaultViewType;
			if (currentViewType === SUBFORM_VIEW_LIST) {
				return <SubformList {...this.props} swapRecords={this.swapRecords} />;
			} else if (currentViewType === SUBFORM_VIEW_STACKED) {
				return <SubformStacked {...this.props} swapRecords={this.swapRecords} />;
			}
			return <SubformTabbed {...this.props} swapRecords={this.swapRecords} />;
			
		} else if (this.props.table.type === TYPE_OTO) {
			return <SubformSingle {...this.props} />;
		}
		return null;
	}
}

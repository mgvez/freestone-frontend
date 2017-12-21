import React, { Component } from 'react';

import { TYPE_MTM } from '../../../freestone/schemaProps';

import SubformMtm from '../../../containers/form/subform/SubformMtm';
import SubformStandard from '../../../containers/form/subform/SubformStandard';

export default class Subform extends Component {
	static propTypes = {
		tableId: React.PropTypes.number,
		parentTableId: React.PropTypes.number,
		parentRecordId: React.PropTypes.string,
		language: React.PropTypes.string,
		titleOverride: React.PropTypes.string,
		descriptionAppend: React.PropTypes.string,

		isCollapsed: React.PropTypes.bool,
		table: React.PropTypes.object,

		fetchTable: React.PropTypes.func,
		setSubformCollapsed: React.PropTypes.func,
	};

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
				isCollapsed={this.props.isCollapsed}
				setSubformCollapsed={this.props.setSubformCollapsed}
				titleOverride={this.props.titleOverride}
				descriptionAppend={this.props.descriptionAppend}
			/>);
		}
		// console.log(this.props.language);

		return (<SubformStandard
			tableId={this.props.tableId}
			parentRecordId={this.props.parentRecordId}
			parentTableId={this.props.parentTableId}
			isCollapsed={this.props.isCollapsed}
			setSubformCollapsed={this.props.setSubformCollapsed}
			titleOverride={this.props.titleOverride}
			descriptionAppend={this.props.descriptionAppend}
			language={this.props.language}
		/>);

	}
}

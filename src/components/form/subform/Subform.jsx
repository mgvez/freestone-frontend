import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TYPE_MTM } from '../../../freestone/schemaProps';

import SubformMtm from '../../../containers/form/subform/SubformMtm';
import SubformStandard from '../../../containers/form/subform/SubformStandard';
import { LOCATIONS } from '../buttons/EditSchema';
import EditSchema from '../../../containers/form/buttons/EditSchema';

export default class Subform extends Component {
	static propTypes = {
		tableId: PropTypes.number,
		parentTableId: PropTypes.number,
		parentRecordId: PropTypes.string,
		language: PropTypes.string,
		titleOverride: PropTypes.string,
		descriptionAppend: PropTypes.string,

		isCollapsed: PropTypes.bool,
		table: PropTypes.object,

		fetchTable: PropTypes.func,
		setSubformCollapsed: PropTypes.func,
		isGod: PropTypes.bool,
	};

	componentDidMount() {
		this.requireData(this.props);
	}

	componentDidUpdate() {
		this.requireData(this.props);
	}

	requireData(props) {
		// console.log(props);
		const { tableId } = props;
		if (!props.table) this.props.fetchTable(tableId);
	}

	changeCollapsedState = () => {
		this.props.setSubformCollapsed(this.props.table.id, !this.props.isCollapsed);
	}

	render() {
		if (!this.props.table) return null;

		if (this.props.table.type === TYPE_MTM) {
			return (<SubformMtm
				tableId={this.props.tableId}
				parentRecordId={this.props.parentRecordId}
				parentTableId={this.props.parentTableId}
				isCollapsed={this.props.isCollapsed}
				changeCollapsedState={this.changeCollapsedState}
				titleOverride={this.props.titleOverride}
				descriptionAppend={this.props.descriptionAppend}
			/>);
		}
		// console.log(`render ${this.props.tableId}`);

		return (<SubformStandard
			tableId={this.props.tableId}
			parentRecordId={this.props.parentRecordId}
			parentTableId={this.props.parentTableId}
			isCollapsed={this.props.isCollapsed}
			changeCollapsedState={this.changeCollapsedState}
			titleOverride={this.props.titleOverride}
			descriptionAppend={this.props.descriptionAppend}
			language={this.props.language}
			editSchema={() => [
				<EditSchema table={this.props.table} location={LOCATIONS.SUBFORM} />,
			]}
		/>);

	}
}

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchTable } from '../../../../actions/schema';
import { setSubformCollapsed } from '../../../../actions/subform';
import { subformMapStateToProps } from '../../../../selectors/subform';

import { SubformMtm } from './SubformMtm';
import { SubformStandard } from './SubformStandard';

import { TYPE_MTM } from '../../../../freestone/schemaProps';


@connect(
	subformMapStateToProps,
	dispatch => bindActionCreators({ fetchTable, setSubformCollapsed }, dispatch)
)
export class Subform extends Component {
	static propTypes = {
		tableId: React.PropTypes.number,
		parentTableId: React.PropTypes.number,
		parentRecordId: React.PropTypes.string,
		language: React.PropTypes.string,

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
			/>);
		}
		// console.log(this.props.language);

		return (<SubformStandard
			tableId={this.props.tableId}
			parentRecordId={this.props.parentRecordId}
			parentTableId={this.props.parentTableId}
			isCollapsed={this.props.isCollapsed}
			setSubformCollapsed={this.props.setSubformCollapsed}
			language={this.props.language}
		/>);

	}
}

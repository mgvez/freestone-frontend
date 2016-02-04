import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as schemaActionCreators from 'actions/schema';
import * as recordActionCreators from 'actions/record';

import { formChildrenRecordsSelector } from 'selectors/FormChildrenRecords';

import { RequireApiData } from 'containers/common/RequireApiData';
import { SingleRecord } from 'containers/Form/SingleRecord';
import { Tab } from 'components/Form/Tab';

@connect(
	formChildrenRecordsSelector,
	dispatch => bindActionCreators({ ...schemaActionCreators, ...recordActionCreators }, dispatch)
)
export class Children extends Component {
	static propTypes = {
		tableId: React.PropTypes.number,
		parentTableName: React.PropTypes.string,
		parentRecordId: React.PropTypes.string,

		childrenRecords: React.PropTypes.array,
		activeRecord: React.PropTypes.string,
		table: React.PropTypes.object,

		fetchTable: React.PropTypes.func,
		fetchRecord: React.PropTypes.func,
		setShownRecord: React.PropTypes.func,
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
		let tabs;
		let form;
		if (this.props.childrenRecords) {
			let activeRecordId;
			tabs = (
				<div>
					{
						this.props.childrenRecords.map((record, index) => {
							const active = record.id === this.props.activeRecord || (index === 0 && !this.props.activeRecord);
							if (active) activeRecordId = record.id;
							return (<Tab 
								key={record.id}
								displayLabel={record.label}
								isActive={active}
								recordId={record.id}
								tableName={this.props.table.name}
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

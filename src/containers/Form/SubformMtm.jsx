import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { DragDropContext as dragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { RequireApiData } from 'utils/RequireApiData';
import { fetchTable } from 'actions/schema';
import * as recordActionCreators from 'actions/record';

import { mtmFormSelector } from 'selectors/mtmForm';

import { Header } from 'components/Form/Header';


@dragDropContext(HTML5Backend)
@connect(
	mtmFormSelector,
	dispatch => bindActionCreators({ ...recordActionCreators, fetchTable }, dispatch)
)
export class SubformMtm extends Component {
	static propTypes = {
		tableId: React.PropTypes.number,
		table: React.PropTypes.object,
		records: React.PropTypes.array,
		parentTableId: React.PropTypes.number,
		parentRecordId: React.PropTypes.string,
		mtmOptions: React.PropTypes.array,

		fetchTable: React.PropTypes.func,
		fetchMtmOptions: React.PropTypes.func,
		fetchMtmRecords: React.PropTypes.func,
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
			this.requireDataCtrl.requireProp('mtmOptions', props, this.props.fetchMtmOptions, [tableName]);
			this.requireDataCtrl.requireProp('records', props, this.props.fetchMtmRecords, [tableName, parentRecordId, parentTableId]);

		}
	}

	render() {
		if (this.props.records) {
			this.props.records.map((record, index) => {
				console.log(record);
			});
		}
		if (this.props.mtmOptions) {
			// console.log(this.props.mtmOptions);
			return (
				<section>
					<Header table={this.props.table} />
					{
						this.props.mtmOptions.map((optionGroup, groupIndex) => {
							// console.log(optionGroup);
							
							const { categ, options } = optionGroup;
							return options.map((option, optionIndex) => {
								// console.log(option);
								const { display, id } = option;
								return (
									<div className="col-md-3"
										key={id}
									>
									{optionIndex}. {id}:{display}
									</div>
								);
							});
							
						})
					}
				</section>
			);
		}

		return null;

	}
}

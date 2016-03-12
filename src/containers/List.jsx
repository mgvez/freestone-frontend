import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as schemaActionCreators from 'actions/schema';
import * as recordActionCreators from 'actions/record';
import { swapOrder } from 'actions/save';

import { Heading } from 'components/RecordList/Heading';
import { Paging } from 'components/RecordList/Paging';
import { Row } from 'components/RecordList/Row';
import { RequireApiData } from 'utils/RequireApiData';

import { listRecordsSelector } from 'selectors/ListRecords';

@connect(
	listRecordsSelector,
	dispatch => bindActionCreators({ ...schemaActionCreators, ...recordActionCreators, swapOrder }, dispatch)
)
export class List extends Component {
	static propTypes = {
		params: React.PropTypes.object,

		env: React.PropTypes.object,
		table: React.PropTypes.object,
		searchableFields: React.PropTypes.array,
		groupedRecords: React.PropTypes.array,
		nPages: React.PropTypes.number,
		curPage: React.PropTypes.number,
		nRecords: React.PropTypes.number,
		search: React.PropTypes.string,

		fetchTable: React.PropTypes.func,
		fetchList: React.PropTypes.func,
		swapOrder: React.PropTypes.func,
	};

	static contextTypes = {
		router: React.PropTypes.object,
	};

	constructor(props) {
		super(props);
		this.requireDataCtrl = new RequireApiData;
		this.nattempts = 0;
	}


	componentWillMount() {
		this.requireData(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.requireData(nextProps);
	}
	
	shouldComponentUpdate(nextProps) {
		//si aucun record, on est en train d'updater l'ordre... attend d'avoir les records avant de render, pour pas flasher de blanc
		return !!(nextProps.groupedRecords && nextProps.groupedRecords.length);
	}
	
	requireData(props) {
		if (this.nattempts > 5) return;
		const { tableName, page, search } = props.params;
		this.requireDataCtrl.requireProp('table', props, this.props.fetchTable, [tableName]);
		this.requireDataCtrl.requireProp('groupedRecords', props, this.props.fetchList, [tableName, search, page || 1]);

	}

	handleSubmit = (e) => {
		e.preventDefault();
		const inp = this.refs.searchVal;
		let val = inp.value;
		val = val ? `/${val}` : '';
		// console.log(inp.value);
		const path = `list/${this.props.params.tableName}/${this.props.curPage}${val}`;
		// console.log(path);
		this.context.router.push(path);
	};

	render() {
		// console.log(this.props.table);
		// console.log('render list');
		// console.log(this.props.groupedRecords);
		let output;
		if (this.props.table && this.props.groupedRecords) {

			output = (
				<section>
					<header>
						<h1>{this.props.table.actionLabel}</h1>
						<div className="text-description">{this.props.table.help}</div>
					</header>

					<div className="padded-content">
						<form onSubmit={this.handleSubmit}>
							<input placeholder="search" ref="searchVal" initialValue="" />
							<button><i className="fa fa-search"></i></button>
						</form>
					</div>

					<div className="padded-content">
						<table className="table list-records">
							<thead>
								<Heading
									fields={this.props.searchableFields}
									hasOrder={this.props.table.hasOrder}
									isSelfTree={this.props.table.isSelfTree}
								/>

							</thead>
							{
								this.props.groupedRecords.map((group, groupIdx) => {
									let groupHeading;
									if (group.label) {
										groupHeading = (
											<tr>
												<td colSpan="20">
												<strong>{group.label}</strong>
												</td>
											</tr>
										);
									}

									return (
										<tbody key={groupIdx}>
										{ groupHeading }
										{
											group.records.map((record, idx) => {
												return (
													<Row
														key={idx}
														fields={this.props.searchableFields}
														values={record}
														table={this.props.table}
														env={this.props.env}
														swapOrder={this.props.swapOrder}
													/>
												);
											})
										}
										</tbody>
									);

								})
							}
						</table>
						<Paging
							nPages={this.props.nPages}
							curPage={this.props.curPage}
							search={this.props.search}
							tableName={this.props.table.name}
						/>
					</div>
				</section>
			);
		}
		return (
			<section>
				{ output }
			</section>
		);
	}
}

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as schemaActionCreators from 'actions/schema';
import * as recordActionCreators from 'actions/record';
import { pushNavStack } from 'actions/nav';

import { Heading } from 'components/static/recordList/Heading';
import { Paging } from 'components/static/recordList/Paging';
import { Row } from 'components/static/recordList/Row';
import { InScroll } from 'components/connected/InScroll';

import { RequireApiData } from 'utils/RequireApiData';

import createRecord from 'freestone/createRecord';

import { listRecordsSelector } from 'selectors/listRecords';

@connect(
	listRecordsSelector,
	dispatch => bindActionCreators({ ...schemaActionCreators, ...recordActionCreators, pushNavStack }, dispatch)
)
export class List extends Component {
	static propTypes = {
		params: React.PropTypes.object,

		table: React.PropTypes.object,
		searchableFields: React.PropTypes.array,
		groupedRecords: React.PropTypes.array,
		nPages: React.PropTypes.number,
		curPage: React.PropTypes.number,
		nRecords: React.PropTypes.number,
		search: React.PropTypes.string,
		qstr: React.PropTypes.string,
		path: React.PropTypes.string,

		fetchTable: React.PropTypes.func,
		fetchList: React.PropTypes.func,
		addRecord: React.PropTypes.func,
		pushNavStack: React.PropTypes.func,

	};

	static contextTypes = {
		router: React.PropTypes.object,
	};

	constructor(props) {
		super(props);
		this.requireDataCtrl = new RequireApiData;
	}


	componentWillMount() {
		this.requireData(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.requireData(nextProps);
		if (nextProps.params.tableName !== this.props.params.tableName && this.refs.searchVal) {
			// console.log('change table');
			this.refs.searchVal.value = '';
		}
	}
	
	shouldComponentUpdate(nextProps) {
		//si aucun record, on est en train d'updater l'ordre... attend d'avoir les records avant de render, pour pas flasher de blanc
		return !!(nextProps.groupedRecords && nextProps.groupedRecords.length);
	}
	
	requireData(props) {
		const { tableName, page, search } = props.params;
		this.requireDataCtrl.requireProp('table', props, this.props.fetchTable, [tableName]);
		this.requireDataCtrl.requireProp('groupedRecords', props, this.props.fetchList, [tableName, search, page || 1]);
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const inp = this.refs.searchVal;
		let val = inp.value;
		val = val ? `/${val}` : '';
		const path = `list/${this.props.params.tableName}/${this.props.curPage}${val}`;
		this.context.router.push(path);
	};

	addRecord = () => {

		const { newRecord, newRecordId } = createRecord(this.props.table);
		this.props.addRecord(this.props.table.id, newRecord);
		this.props.pushNavStack(this.props.path, window.pageYOffset);

		const path = `/edit/${this.props.params.tableName}/${newRecordId}`;
		this.context.router.push(path);

	};

	render() {
		// console.log(this.props.table);
		// console.log('render list');
		// console.log(this.props.groupedRecords);
		let output;
		let readyToScroll = false;
		if (this.props.table && this.props.groupedRecords) {
			readyToScroll = true;
			output = (
				<section>
					<header>
						<h1>{this.props.table.actionLabel}</h1>
						<div className="text-description" dangerouslySetInnerHTML={{ __html: this.props.table.help }} />
						{/* <div className="text-description">{this.props.qstr}</div> */}
						<button onClick={this.addRecord}><i className="fa fa-plus-square"></i> New record</button>

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
			<InScroll isReady={readyToScroll}>
				{ output }
			</InScroll>
		);
	}
}

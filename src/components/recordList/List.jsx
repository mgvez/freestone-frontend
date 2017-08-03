import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';

import { PRIKEY_ALIAS } from '../../freestone/schemaProps';

import { fetchTable } from '../../actions/schema';
import { fetchList, addRecord } from '../../actions/record';

import { Heading } from './Heading';
import { Paging } from './Paging';
import { Row } from './Row';
import { ListSearch } from './ListSearch';
import { InScroll } from '../InScroll';
import { TablePermissions } from '../permissions/TablePermissions';

import createRecord from '../../freestone/createRecord';
import { listRecordsSelector } from '../../selectors/listRecords';

const LARGE_MINW_BREAKPOINT = 1024;

@connect(
	listRecordsSelector,
	dispatch => bindActionCreators({ fetchTable, fetchList, addRecord }, dispatch)
)
export class List extends Component {
	static propTypes = {
		params: React.PropTypes.shape({
			tableName: React.PropTypes.string,
			page: React.PropTypes.string,
			search: React.PropTypes.string,
		}),

		table: React.PropTypes.object,
		searchableFields: React.PropTypes.array,
		groupedRecords: React.PropTypes.array,
		nPages: React.PropTypes.number,
		curPage: React.PropTypes.number,
		nRecords: React.PropTypes.number,
		search: React.PropTypes.string,
		swappedRecords: React.PropTypes.array,
		canAdd: React.PropTypes.bool,

		fetchTable: React.PropTypes.func,
		fetchList: React.PropTypes.func,
		addRecord: React.PropTypes.func,

	};

	static contextTypes = {
		router: React.PropTypes.object,
	};

	constructor(props) {
		super(props);
		this.state = { windowWidth: 0, isLarge: true, hoveringId: 0 };
	}

	componentWillMount() {
		this.requireData(this.props);
	}

	componentDidMount() {
		window.addEventListener('resize', this.handleResize);
		this.handleResize();
	}

	componentWillReceiveProps(nextProps) {
		// console.log(nextProps);
		// console.log(this.props);
		this.requireData(nextProps);
	}

	shouldComponentUpdate(nextProps) {
		// console.log(nextProps);
		// console.log(this.props);
		// console.log(this.props.groupedRecords === nextProps.groupedRecords);
		//si aucun record, on est en train d'updater l'ordre... attend d'avoir les records avant de render, pour pas flasher de blanc
		return !!(nextProps.groupedRecords) && this.props.groupedRecords !== nextProps.groupedRecords;
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}

	getNumRecords = () => {
		return this.props.groupedRecords.reduce((total, gr) => total + gr.records.reduce((subtotal) => subtotal + 1, 0), 0);
	}

	requireData(props) {
		const { tableName, page, search } = props.params;
		if (!props.table) this.props.fetchTable(tableName);
		if (!props.groupedRecords) this.props.fetchList(tableName, search, page || 1);
	}

	handleResize = () => {
		const windowWidth = window.innerWidth;
		const isLarge = windowWidth > LARGE_MINW_BREAKPOINT;
		this.setState({ windowWidth, isLarge });
	}

	addRecord = () => {
		const { newRecord, newRecordId } = createRecord(this.props.table);
		this.props.addRecord(this.props.table.id, newRecord);

		const path = `/edit/${this.props.params.tableName}/${newRecordId}`;
		this.context.router.push(path);
	}

	/**
		Les rows appellent le hover ici
	*/
	handleHover = (recordId) => {
		// console.log('hovering %s', recordId);
		this.setState({ hoveringId: recordId });
	}

	hideAllHovers = () => {
		this.handleHover(null);
	}

	render() {
		// console.log(this.props.table);
		// console.log('render list', this.props.table);
		// console.log(this.props.searchableFields);
		let output;
		let readyToScroll = false;
		if (this.props.table && this.props.groupedRecords) {
			readyToScroll = true;

			let heading = null;
			if (this.state.isLarge) {
				heading = (<thead>
					<Heading
						fields={this.props.searchableFields}
						isSelfTree={this.props.table.isSelfTree}
					/>
				</thead>);
			}

			const addBtn = this.props.canAdd ? <button onClick={this.addRecord} className="button-round"><i className="fa fa-plus-circle"></i> New record</button> : null;
			
			// console.profile('render');
			output = (
				<section>
					<DocumentMeta title={`${this.props.table.displayLabel} - list`} />

					<header className="record-header">
						<div className="texts">
							<h1>{this.props.table.displayLabel}</h1>
							<div className="text-description" dangerouslySetInnerHTML={{ __html: this.props.table.help }} />
						</div>

						<div className="btns">
							{addBtn}
						</div>
					</header>
					
					<TablePermissions table={this.props.table} />

					<div className="padded-content search-ctn">
						<ListSearch tableName={this.props.table.name} numRecords={this.getNumRecords()} search={this.props.params.search} curPage={this.props.curPage} router={this.context.router} />
					</div>

					<div className="padded-content">
						<table className="table list-records" onMouseLeave={this.hideAllHovers} ref={el => this._list = el}>
							{heading}
							{
								this.props.groupedRecords.map((group, groupIdx) => {
									let groupHeading;
									if (group.label) {
										groupHeading = (
											<tr className="group-heading">
												<td colSpan="20">
													<strong>{group.label}</strong>
												</td>
											</tr>
										);
									}

									return (
										<tbody key={groupIdx}>
										{groupHeading}
										{
											group.records.map((record, idx) => {
												const isHovering = this.state.hoveringId === record[PRIKEY_ALIAS];
												return (
													<Row
														key={idx}
														fields={this.props.searchableFields}
														values={record}
														table={this.props.table}
														isLarge={this.state.isLarge}
														isHovering={isHovering}
														handleHover={this.handleHover}
														swappedRecords={this.props.swappedRecords}
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
			// console.profileEnd('render');
			
		}
		return (
			<InScroll isReady={readyToScroll}>
				{output}
			</InScroll>
		);
	}
}
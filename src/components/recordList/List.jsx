import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentMeta from 'react-document-meta';

import { PRIKEY_ALIAS } from '../../freestone/schemaProps';

import Heading from './Heading';
import Paging from './Paging';
import Row from '../../containers/recordList/Row';
import ListSearch from './ListSearch';
import InScroll from '../../containers/InScroll';
import TablePermissions from '../../containers/permissions/TablePermissions';
import createRecord from '../../freestone/createRecord';

const LARGE_MINW_BREAKPOINT = 1024;

export default class List extends Component {
	static propTypes = {

		params: PropTypes.shape({
			tableName: PropTypes.string,
			page: PropTypes.string,
			search: PropTypes.string,
			order: PropTypes.string,
		}),


		table: PropTypes.object,
		searchableFields: PropTypes.array,
		groupedRecords: PropTypes.array,
		nPages: PropTypes.number,
		curPage: PropTypes.number,
		nRecords: PropTypes.number,
		swappedRecords: PropTypes.object,
		canAdd: PropTypes.bool,
		needsFetch: PropTypes.bool,

		fetchTable: PropTypes.func,
		fetchList: PropTypes.func,
		addRecord: PropTypes.func,
		goTo: PropTypes.func,

	};

	static contextTypes = {
		router: PropTypes.object,
	};

	constructor(props) {
		super(props);
		// console.log(this.props);
		this.state = { windowWidth: 0, isLarge: true, hoveringId: 0 };
	}
	
	componentDidMount() {
		this.requireData();
		window.addEventListener('resize', this.handleResize);
		this.handleResize();
	}

	componentDidUpdate() {
		this.requireData();
	}

	// shouldComponentUpdate(nextProps) {
	// 	// console.log(nextProps);
	// 	// console.log(this.props);
	// 	console.log(!!(nextProps.groupedRecords), this.props.groupedRecords === nextProps.groupedRecords);
	// 	//si aucun record, on est en train d'updater l'ordre... attend d'avoir les records avant de render, pour pas flasher de blanc
	// 	return !!(nextProps.groupedRecords) && this.props.groupedRecords !== nextProps.groupedRecords;
	// }

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}

	getNumRecords = () => {
		return this.props.groupedRecords.reduce((total, gr) => total + gr.records.reduce((subtotal) => subtotal + 1, 0), 0);
	}

	requireData() {
		if (!this.props.table) this.props.fetchTable(this.props.params.tableName);
		if (!this.props.groupedRecords || this.props.needsFetch) this.fetchRecords();
	}

	fetchRecords = () => {
		const { tableName, page, search, order } = this.props.params;
		this.props.fetchList(tableName, search, page || 1, order);
	}

	handleResize = () => {
		const windowWidth = window.innerWidth;
		const isLarge = windowWidth > LARGE_MINW_BREAKPOINT;
		this.setState({ windowWidth, isLarge });
	}

	addRecord = () => {
		createRecord(this.props.table).then(res => {
			const { newRecord, newRecordId } = res;
			this.props.addRecord(this.props.table.id, newRecord);

			const path = `/edit/${this.props.params.tableName}/${newRecordId}`;
			this.props.goTo(path);
		});
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
		// console.log(this.props.swappedRecords);
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
						params={this.props.params}
						isSelfTree={this.props.table.isSelfTree}
						fetchList={this.fetchList}
					/>
				</thead>);
			}

			const addBtn = this.props.canAdd ? <button onClick={this.addRecord} className="button-round"><i className="fa fa-plus-circle"></i> New record</button> : null;
			
			// console.log('render list');
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
						<ListSearch tableName={this.props.table.name} numRecords={this.getNumRecords()} search={this.props.params.search} curPage={this.props.curPage} goTo={this.props.goTo} />
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
														fetchRecords={this.fetchRecords}
														hasCustomOrder={!!this.props.params.order}
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
							search={this.props.params.search}
							order={this.props.params.order}
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

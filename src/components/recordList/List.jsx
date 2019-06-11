import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentMeta from 'react-document-meta';

import Paging from './Paging';
import StandardList from './StandardList';
import BankList from '../../containers/recordList/BankList';
import ListSearch from './ListSearch';
import InScroll from '../../containers/utils/InScroll';
import TablePermissions from '../../containers/permissions/TablePermissions';
import ListFetch from '../../containers/process/ListFetch';
import createRecord from '../../freestone/createRecord';

const LARGE_MINW_BREAKPOINT = 1024;

export default class List extends Component {
	static propTypes = {

		params: PropTypes.shape({
			tableName: PropTypes.string,
			filter: PropTypes.array,
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
		addRecord: PropTypes.func,
		goTo: PropTypes.func,

	};

	static contextTypes = {
		router: PropTypes.object,
	};

	constructor(props) {
		super(props);
		// console.log(this.props);
		this.state = { windowWidth: 0, isLarge: true };
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
		return this.props.groupedRecords && this.props.groupedRecords.reduce((total, gr) => total + gr.records.reduce((subtotal) => subtotal + 1, 0), 0);
	}

	requireData() {
		if (!this.props.table) this.props.fetchTable(this.props.params.tableName);
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

	render() {
		// console.log(this.props.swappedRecords);
		// console.log('render list', this.props.table);
		// console.log(this.props.searchableFields);
		let output;
		let readyToScroll = false;
		if (this.props.table) {

			const addBtn = this.props.canAdd ? <button onClick={this.addRecord} className="button-round"><i className="fa fa-plus-circle"></i> New record</button> : null;
			
			let records = null;
			// if record list is loaded, display records. Bank records are displayed differently than regular records.
			if (this.props.groupedRecords) {
				readyToScroll = true;

				if (this.props.table.bankName) {
					records = (<BankList
						isLarge={this.state.isLarge}
						bankName={this.props.table.bankName}
						{...this.props}
					/>);
				} else {
					records = (<StandardList
						isLarge={this.state.isLarge}
						{...this.props}
					/>);
				}
			}

			// console.log('render list');
			const needsFetch = !this.props.groupedRecords || this.props.needsFetch;
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
						
						<ListSearch 
							key={`search_${this.props.table.name}`}
							tableName={this.props.table.name}
							numRecords={this.getNumRecords()}
							params={this.props.params}
							goTo={this.props.goTo}
							needsFetch={needsFetch}
						>
							<ListFetch needsFetch={needsFetch} params={this.props.params} />
						</ListSearch>
					</div>
					<div className="padded-content">
						{records}
					</div>
					<Paging
						params={this.props.params}
						nPages={this.props.nPages}
						curPage={this.props.curPage}
						search={this.props.params.search}
						order={this.props.params.order}
						tableName={this.props.table.name}
					/>
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

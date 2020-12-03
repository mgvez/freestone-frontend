import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentMeta from 'react-document-meta';

import Paging from './Paging';
import EditableList from './editable/EditableList';
import ListSearch from './ListSearch';
import InScroll from '../../containers/utils/InScroll';
import TablePermissions from '../../containers/permissions/TablePermissions';
import ListFetch from '../../containers/process/ListFetch';
import { Button } from '../../styles/Button';
import { Header, HeaderTexts } from '../../styles/Header';
import { Heading1 } from '../../styles/Texts';
import { MainZone } from '../../styles/Grid';

const LARGE_MINW_BREAKPOINT = 1024;

export default class BatchEdit extends Component {
	static propTypes = {

		params: PropTypes.shape({
			filter: PropTypes.string,
			page: PropTypes.string,
			search: PropTypes.string,
			order: PropTypes.string,
		}),

		tableName: PropTypes.string,
		table: PropTypes.object,
		batchEditableFields: PropTypes.array,
		groupedRecords: PropTypes.array,
		nPages: PropTypes.number,
		curPage: PropTypes.number,
		nRecords: PropTypes.number,
		swappedRecords: PropTypes.object,
		canAdd: PropTypes.bool,
		needsFetch: PropTypes.bool,

		fetchTable: PropTypes.func,
		goTo: PropTypes.func,

	};

	static contextTypes = {
		router: PropTypes.object,
	};

	constructor(props) {
		super(props);
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

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}

	getNumRecords = () => {
		return this.props.groupedRecords && this.props.groupedRecords.reduce((total, gr) => total + gr.records.reduce((subtotal) => subtotal + 1, 0), 0);
	}

	requireData() {
		if (!this.props.table) this.props.fetchTable(this.props.tableName);
	}

	handleResize = () => {
		const windowWidth = window.innerWidth;
		const isLarge = windowWidth > LARGE_MINW_BREAKPOINT;
		this.setState({ windowWidth, isLarge });
	}

	render() {
		// console.log(this.props.swappedRecords);
		// console.log('render list', this.props.table);
		let output;
		let readyToScroll = false;
		if (this.props.table) {
			
			let records = null;
			// if record list is loaded, display records. Bank records are displayed differently than regular records.
			if (this.props.groupedRecords) {
				readyToScroll = true;

				records = (<EditableList
					isLarge={this.state.isLarge}
					{...this.props}
				/>);
			}

			const needsFetch = !this.props.groupedRecords || this.props.needsFetch;
			// console.log('render list needs fetch %s', needsFetch);
			output = (
				<section>
					<DocumentMeta title={`${this.props.table.displayLabel} - list`} />

					<Header>
						<HeaderTexts columns="8">
							<Heading1>{this.props.table.displayLabel}</Heading1>
							<p dangerouslySetInnerHTML={{ __html: this.props.table.help }} />
						</HeaderTexts>
					</Header>
					
					<MainZone>
						<ListSearch 
							key={`search_${this.props.tableName}`}
							tableName={this.props.tableName}
							numRecords={this.getNumRecords()}
							search={this.props.params.search}
							goTo={this.props.goTo}
							needsFetch={needsFetch}
						>
							<ListFetch needsFetch={needsFetch} tableName={this.props.tableName} params={this.props.params} />
						</ListSearch>
						BATCH EDIT
						{records}
						<Paging
							nPages={this.props.nPages}
							curPage={this.props.curPage}
							tableName={this.props.tableName}
						/>
					</MainZone>
					
				</section>
			);
		}

		return (
			<InScroll isReady={readyToScroll}>
				{output}
			</InScroll>
		);
	}
}

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { RequireApiData } from 'utils/RequireApiData';

import { fetchTable } from 'actions/schema';
import { fetchForeignOptions } from 'actions/foreign-options';
import { loadedRecords } from 'selectors/loadedRecords';


@connect(
	loadedRecords,
	dispatch => bindActionCreators({ fetchTable, fetchForeignOptions }, dispatch)
)
export class LoadedRecords extends Component {
	static propTypes = {
		fetchTable: React.PropTypes.func,
		fetchForeignOptions: React.PropTypes.func,

		records: React.PropTypes.array,
		unloadedForeignOptions: React.PropTypes.array,
		toggleState: React.PropTypes.object,
	};

	constructor(props) {
		super(props);
		this.requireDataCtrl = new RequireApiData;
	}

	componentWillMount() {
		this.requireData(this.props);
	}

	componentWillReceiveProps(props) {
		this.requireData(props);
	}

	requireData(props) {
		// console.log(props);
		if (props.records) {
			props.records.filter(records => !records.table).forEach(records => {
				// console.log(records.tableId);
				this.props.fetchTable(records.tableId);
			});
		}
	}

	render() {
		// console.log('%cRender menu', 'font-weight: bold');
		// console.log(this.props.tree);

		if (!this.props.records) return null;

		return (
			<nav className="loaded-records">
				<h2>Loaded records</h2>
				{
					this.props.records.map((records) => {
						if (!records.records || !records.table) return null;
						return (
							<div key={records.tableId}>
								<h3>{records.table.displayLabel}</h3>
								<ul>
								{
									records.records.map(record => {
										return (
											<li key={`${records.tableId}_${record.id}`}>
												{record.label}
												<Link to={`/edit/${records.table.name}/${record.id}`} activeClassName="active" className="btn btn-primary btn-xs"><i className="fa fa-pencil"></i><span> Edit</span></Link>
												<Link to={`/cancel/${records.table.name}/${record.id}`} className="btn btn-xs btn-danger">Cancel</Link>
											</li>
										);
									})
								}
								</ul>
							</div>
						);
					})
				}
			</nav>
		);
	}
}

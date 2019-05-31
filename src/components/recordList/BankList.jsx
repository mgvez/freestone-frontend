import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { PRIKEY_ALIAS } from '../../freestone/schemaProps';

import BankListCell from '../../containers/recordList/BankListCell';

export default class BankList extends Component {
	static propTypes = {
		isLarge: PropTypes.bool,
		hoveringId: PropTypes.string,

		params: PropTypes.shape({
			tableName: PropTypes.string,
			page: PropTypes.string,
			search: PropTypes.string,
			order: PropTypes.string,
		}),


		table: PropTypes.object,
		searchableFields: PropTypes.array,
		groupedRecords: PropTypes.array,
		swappedRecords: PropTypes.object,

		fetchList: PropTypes.func,

	};

	constructor(props) {
		super(props);
		this.state = { hoveringId: 0 };
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

		return (
			<section>
			{
				this.props.groupedRecords.map((group, groupIdx) => {
					let groupHeading;
					if (group.label) {
						groupHeading = (
							<div className="group-heading">
								<strong>{group.label}</strong>
							</div>
						);
					}

					return (
						<div key={groupIdx}>
							{groupHeading}
							<div className="row">
							{
								group.records.map((record) => {
									const pk = record[PRIKEY_ALIAS];
									return <BankListCell key={`${this.props.table.name}_${pk}`} record={record} table={this.props.table} />;
								})
							}
							</div>
						</div>
					);

				})
			}
			</section>
		);
	}
}

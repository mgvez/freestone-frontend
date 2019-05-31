import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { PRIKEY_ALIAS } from '../../freestone/schemaProps';

import Heading from './Heading';
import Row from '../../containers/recordList/Row';

export default class StandardList extends Component {
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

		let heading = null;
		if (this.props.isLarge) {
			heading = (<thead>
				<Heading
					fields={this.props.searchableFields}
					params={this.props.params}
					isSelfTree={this.props.table.isSelfTree}
					fetchList={this.fetchList}
				/>
			</thead>);
		}
		return (
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
								group.records.map((record) => {
									const pk = record[PRIKEY_ALIAS];
									const isHovering = this.props.hoveringId === pk;

									return (<Row
										key={`${this.props.table.name}_${pk}`}
										fields={this.props.searchableFields}
										values={record}
										table={this.props.table}
										isLarge={this.props.isLarge}
										isHovering={isHovering}
										handleHover={this.handleHover}
										swappedRecords={this.props.swappedRecords}
										fetchRecords={this.fetchRecords}
										hasCustomOrder={!!this.props.params.order}
									/>);
								})
							}
							</tbody>
						);
					})
				}
			</table>
		);
	}
}

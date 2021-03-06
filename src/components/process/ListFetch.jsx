import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ListFetch extends Component {
	static propTypes = {
		tableName: PropTypes.string,
		params: PropTypes.shape({
			page: PropTypes.string,
			search: PropTypes.string,
			filter: PropTypes.string,
			order: PropTypes.string,
		}),

		needsFetch: PropTypes.bool,
		fetchList: PropTypes.func,
	};

	componentDidMount() {
		this.fetchRecords();
	}

	componentDidUpdate() {
		this.fetchRecords();
	}

	requireData() {
		if (this.props.needsFetch) this.fetchRecords();
	}

	fetchRecords() {
		const { page, search, order, filter } = this.props.params;
		this.props.fetchList(this.props.tableName, search, filter, page || 1, order);
	}

	render() {
		return this.props.needsFetch ? <span>Getting records from database...</span> : null;
	}
}

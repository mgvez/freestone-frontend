import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from 'actions/schema';


@connect(
	state => state.schema,
	dispatch => bindActionCreators(actionCreators, dispatch)
)
export class List extends Component {
	static propTypes = {
		params: React.PropTypes.object,
		tables: React.PropTypes.object,
		fetchTable: React.PropTypes.func,
	};

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.requireTable(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.requireTable(nextProps);
	}

	requireTable(props) {
		const { tableName } = this.props.params;
		if (tableName && !props.tables[tableName]) {
			this.props.fetchTable(tableName);
		}
	}

	render() {
		const { tableName } = this.props.params;
		const table = this.props.tables[tableName];
		// console.log(this.props);
		let recordList;
		if (table) {
			recordList = (
				<div>
					<h1>List records from {this.props.params.name}</h1>
					<h2>{table.actionLabel}</h2>
				</div>
			);
		}
		return (
			<section>
				{ recordList }
			</section>
		);
	}
}

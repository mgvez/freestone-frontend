import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from 'actions/schema';


let tried = false;

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
		this.requireTable();
	}

	componentWillReceiveProps() {
		this.requireTable();
	}

	requireTable() {
		const { tableName } = this.props.params;
		console.log(tableName);
		if (tableName && !tried && !this.props.tables[tableName]) {
			this.props.fetchTable(tableName);
			return null;
		}
		return this.props.tables[tableName];
	}

	render() {
		const table = this.requireTable();
		// console.log(this.props);
		return (
			<section>
				<h1>List records from {this.props.params.name}</h1>
				<h2>{table.actionLabel}</h2>
			</section>
		);
	}
}

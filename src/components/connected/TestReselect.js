import React, { Component } from 'react';
import { connect } from 'react-redux';

import { makeMapStateToProps } from 'selectors/tableSchema';

@connect(
	makeMapStateToProps,
	null
)
export class TestReselect extends Component {
	static propTypes = {
		params: React.PropTypes.object,

		table: React.PropTypes.object,
		field: React.PropTypes.object,
	};

	constructor(props) {
		super(props);
	}

	render() {
		const { table } = this.props;
		return (
			<div>
				Test Reselect {this.props.params.tableId} {table && table.name}
			</div>
		);
	}
}

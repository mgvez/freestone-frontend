import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { cancelEdit } from 'actions/record';
import { goTo } from 'actions/nav';

import { buildCancelRecordSelector } from 'selectors/buildRecord';

@connect(
	buildCancelRecordSelector,
	dispatch => bindActionCreators({ cancelEdit, goTo }, dispatch)
)
export class Cancel extends Component {
	static propTypes = {
		params: React.PropTypes.shape({
			tableName: React.PropTypes.string,
			recordId: React.PropTypes.string,
		}),

		records: React.PropTypes.array,

		cancelEdit: React.PropTypes.func,
		goTo: React.PropTypes.func,
	};

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.props.cancelEdit(this.props.records);

		const backPath = { path: `list/${this.props.params.tableName}` };
		this.props.goTo(backPath);

	}

	render() {
		// console.log(this.props.saveState);
		return (
			<div>
				Cancelling...
			</div>
		);
	}
}

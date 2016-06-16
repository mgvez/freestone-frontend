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
		tableName: React.PropTypes.string,
		recordId: React.PropTypes.string,

		records: React.PropTypes.array,

		callback: React.PropTypes.func,
		cancelEdit: React.PropTypes.func,
		goTo: React.PropTypes.func,
	};

	constructor(props) {
		super(props);
	}

	componentWillMount() {

		this.setState({
			cancelling: false,
		});
	}

	doCancel = () => {
		this.setState({
			cancelling: true,
		});

		this.props.cancelEdit(this.props.records);

		if (this.props.callback) {
			this.props.callback();
		} else {
			const backPath = { path: `list/${this.props.tableName}` };
			this.props.goTo(backPath);
		}
	};

	render() {
		if (this.state.cancelling) {
			return <span>Cancelling</span>;
		}

		return (
			<a onClick={this.doCancel} className="button-round-warn">Cancel changes</a>
		);
	}
}

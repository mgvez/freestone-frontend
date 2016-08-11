import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { deleteRecord } from 'actions/save';

@connect(
	null,
	dispatch => bindActionCreators({ deleteRecord }, dispatch)
)
export class DeleteBtn extends Component {
	static propTypes = {
		prikey: React.PropTypes.string,
		tableName: React.PropTypes.string,
		deleteRecord: React.PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.state = {
			requested: false,
		};
	}

	cancel = () => {
		this.setState({
			requested: false,
		});
	}

	process = () => {
		if (this.state.requested) {
			this.props.deleteRecord(this.props.tableName, this.props.prikey);
		} else {
			this.setState({
				requested: true,
			});
		}
	};

	render() {
		
		if (this.state.requested) {
			return (
				<div className="record-action prompt">
					<div onClick={this.process}><i className="fa fa-close"></i>Confirm</div>
					<div onClick={this.cancel}><i className="fa fa-undo"></i>Cancel</div>
				</div>
			);
		}

		return (
			<div className="record-action" onClick={this.process}><i className="fa fa-close"></i>Delete</div>
		);
	}
}

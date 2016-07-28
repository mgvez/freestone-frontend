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
				<div>
					<a onClick={this.process}>Confirm delete</a>
					<a onClick={this.cancel}>Cancel</a>
				</div>
			);
		}

		return (
			<a className="button-round-danger" onClick={this.process}><i className="fa fa-close"></i><span> Delete</span></a>
		);
	}
}

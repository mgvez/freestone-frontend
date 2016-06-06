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
	}

	process = () => {
		this.props.deleteRecord(this.props.tableName, this.props.prikey);
	};

	render() {
				
		return (
			<a className="btn btn-danger btn-sm" onClick={this.process}><i className="fa fa-close"></i><span> Delete</span></a>
		);
	}
}

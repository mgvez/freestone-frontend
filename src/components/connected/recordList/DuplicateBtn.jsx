import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { duplicateRecord } from 'actions/record';

@connect(
	null,
	dispatch => bindActionCreators({ duplicateRecord }, dispatch)
)
export class DuplicateBtn extends Component {
	static propTypes = {
		prikey: React.PropTypes.string,
		tableName: React.PropTypes.string,
		duplicateRecord: React.PropTypes.func,
	};

	constructor(props) {
		super(props);
	}

	process = () => {
		this.props.duplicateRecord(this.props.tableName, this.props.prikey);
	};

	render() {
				
		return (
			<a className="button-round-warn" onClick={this.process}><i className="fa fa-clone"></i><span> Duplicate</span></a>
		);
	}
}

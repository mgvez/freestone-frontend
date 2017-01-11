import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { buildCopyRecordSelector } from 'selectors/buildRecord';

@connect(
	buildCopyRecordSelector
)
export class CopyRecord extends Component {
	static propTypes = {
		tableId: React.PropTypes.number,
		recordId: React.PropTypes.string,
		records: React.PropTypes.object,
	};

	copyRecord = () => {
		console.log(`copy ${this.props.tableId} ${this.props.recordId}`);
		console.log(this.props.records);
	};

	render() {
		return <button onClick={this.copyRecord} className="button-round-danger">Copy record as duplicate</button>;
	}
}

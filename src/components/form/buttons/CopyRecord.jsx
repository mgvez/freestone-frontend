import React, { Component } from 'react';

export default class CopyRecord extends Component {
	static propTypes = {
		tableId: React.PropTypes.number,
		recordId: React.PropTypes.string,
		records: React.PropTypes.object,
	};

	copyRecord = () => {
		// console.log(`copy ${this.props.tableId} ${this.props.recordId}`);
		// console.log(this.props.records);
	};

	render() {
		return <button onClick={this.copyRecord} className="button-round-danger">Copy record as duplicate</button>;
	}
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CopyRecord extends Component {
	static propTypes = {
		tableId: PropTypes.number,
		recordId: PropTypes.string,
		records: PropTypes.object,
	};

	copyRecord = () => {
		// console.log(`copy ${this.props.tableId} ${this.props.recordId}`);
		// console.log(this.props.records);
	};

	render() {
		return <button onClick={this.copyRecord} className="button-round-danger">Copy record as duplicate</button>;
	}
}

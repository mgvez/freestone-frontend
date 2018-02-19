import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class DeleteRecord extends Component {
	static propTypes = {
		tableId: PropTypes.number,
		recordId: PropTypes.string,
		parentRecordId: PropTypes.string,
		language: PropTypes.string,

		setShownRecord: PropTypes.func,
		setRecordDeleted: PropTypes.func,
	};

	deleteRecord = () => {
		this.props.setRecordDeleted(this.props.tableId, this.props.recordId);
		if (this.props.parentRecordId) {
			this.props.setShownRecord(this.props.tableId, this.props.parentRecordId, null, this.props.language);
		}
	};

	render() {
		return <button onClick={this.deleteRecord} className="button-rounded-danger">Delete record</button>;
	}
}

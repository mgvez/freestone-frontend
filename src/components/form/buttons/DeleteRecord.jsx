import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../../styles/Button';
import { Icon } from '../../../styles/Icon';

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
		return <Button onClick={this.deleteRecord} round danger small margin="5px 5px 0 0 "><Icon icon="trash-alt" /> Delete record</Button>;
	}
}

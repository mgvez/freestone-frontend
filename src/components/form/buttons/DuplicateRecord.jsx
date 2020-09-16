import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../../styles/Button';
import { Icon } from '../../../styles/Icon';
import createRecord from '../../../freestone/createRecord';

export default class DuplicateRecord extends Component {
	static propTypes = {
		table: PropTypes.object,

		recordId: PropTypes.string,
		tableId: PropTypes.number,
		parentRecordId: PropTypes.string,
		parentTableId: PropTypes.number,
		language: PropTypes.string,
		record: PropTypes.object,

		setShownRecord: PropTypes.func,
		addRecord: PropTypes.func,
	};

	addDuplicateRecord = () => {
		// this.props.addRecord(this.props.tableId, this.props.recordId);
		// if (this.props.parentRecordId) {
		// 	this.props.setShownRecord(this.props.tableId, this.props.parentRecordId, null, this.props.language);
		// }
		const language = this.props.table.hasLanguage ? this.props.language : null;
		const model = this.props.record;
		createRecord(this.props.table, this.props.parentTableId, this.props.parentRecordId, null, model).then(res => {
			const { newRecord, newRecordId } = res;
			// console.log(newRecord);
			this.props.addRecord(this.props.table.id, newRecord);
			this.props.setShownRecord(this.props.table.id, this.props.parentRecordId, newRecordId, language);
		});
	};

	render() {
		// console.log(this.props);
		return <Button onClick={this.addDuplicateRecord} round="true" warn="true" small="true"><Icon icon="copy" /> Duplicate record</Button>;
	}
}

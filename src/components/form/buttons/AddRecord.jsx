import React, { Component } from 'react';
import PropTypes from 'prop-types';
import createRecord from '../../../freestone/createRecord';
import { Button } from '../../../styles/Button';

export default class AddRecord extends Component {
	static propTypes = {
		table: PropTypes.object,
		highestOrder: PropTypes.number,
		parentTableId: PropTypes.number,
		parentRecordId: PropTypes.string,
		language: PropTypes.string,
		isTab: PropTypes.bool,

		addRecord: PropTypes.func,
		setShownRecord: PropTypes.func,
	};

	addRecord = () => {
		//if table has a language field, we need to add it as a default prop
		const language = this.props.table.hasLanguage ? this.props.language : null;
		const model = this.props.table.hasLanguage ? {
			[this.props.table.languageField.id]: language,
		} : null;
		createRecord(this.props.table, this.props.parentTableId, this.props.parentRecordId, (this.props.highestOrder || 0) + 10, model).then(res => {
			const { newRecord, newRecordId } = res;
			// console.log(newRecord);
			this.props.addRecord(this.props.table.id, newRecord);
			this.props.setShownRecord(this.props.table.id, this.props.parentRecordId, newRecordId, language);
		});
	};

	render() {
		return this.props.isTab ? <div onClick={this.addRecord}><i className="fa fa-plus"></i></div> : <Button onClick={this.addRecord} round><i className="fa fa-plus"></i></Button>;
	}
}

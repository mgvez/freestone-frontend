import React, { Component } from 'react';
import createRecord from '../../../freestone/createRecord';

export default class AddRecord extends Component {
	static propTypes = {
		table: React.PropTypes.object,
		highestOrder: React.PropTypes.number,
		parentTableId: React.PropTypes.number,
		parentRecordId: React.PropTypes.string,
		language: React.PropTypes.string,

		addRecord: React.PropTypes.func,
		setShownRecord: React.PropTypes.func,
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
		return <button onClick={this.addRecord} className="add-record"><i className="fa fa-plus"></i></button>;
	}
}

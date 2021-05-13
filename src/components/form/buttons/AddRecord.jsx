import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import createRecord from '../../../freestone/createRecord';
import { Button } from '../../../styles/Button';
import { Icon } from '../../../styles/Icon';

export default function AddRecord(props) {


	const addRecord = () => {
		//if table has a language field, we need to add it as a default prop
		const language = props.table.hasLanguage ? props.language : null;
		const model = props.table.hasLanguage ? {
			[props.table.languageField.id]: language,
		} : null;
		createRecord(props.table, props.parentTableId, props.linkValue, (props.highestOrder || 0) + 100, model).then(res => {
			const { newRecord, newRecordId } = res;
			// console.log(newRecord);
			props.addRecord(props.table.id, newRecord);
			props.setShownRecord(props.table.id, props.parentRecordId, newRecordId, language);
		});
	};

	useEffect(() => {
		if (props.autoAdd) {
			addRecord();
		}
	}, [props.autoAdd]);

	return props.isTab ? <div onClick={addRecord} className="tab"><Icon icon="plus" side="center" /></div> : <Button onClick={addRecord} round="true"><Icon icon="plus" side="center" /></Button>;

}

AddRecord.propTypes = {
	table: PropTypes.object,
	highestOrder: PropTypes.number,
	parentTableId: PropTypes.number,
	parentRecordId: PropTypes.string,
	linkValue: PropTypes.string,
	language: PropTypes.string,
	isTab: PropTypes.bool,
	autoAdd: PropTypes.bool,

	addRecord: PropTypes.func,
	setShownRecord: PropTypes.func,
};

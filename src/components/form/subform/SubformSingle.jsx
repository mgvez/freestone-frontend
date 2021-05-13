import React from 'react';
import PropTypes from 'prop-types';

import AddRecord from '../../../containers/form/buttons/AddRecord';
import FormHeaderContent from '../../header/info/FormHeaderContent';
import SingleRecord from '../../../containers/form/SingleRecord';

import { Subform, SubformHeader } from '../../../styles/Form';

export default function SubformSingle(props) {

	const { isSeoMetadata } = props.table;
	
	const activeRecordId = (props.childrenRecords && props.childrenRecords.length && props.childrenRecords[0].id) || null;
	let addBtn;
	if (!props.childrenRecords || !props.childrenRecords.length) {

		// if we are on SEO metadata table, we need to enforce a record. Send a prop to add record component to automatically create it.

		addBtn = (
			<AddRecord 
				table={props.table}
				parentRecordId={props.parentRecordId}
				parentTableId={props.parentTableId}
				autoAdd={isSeoMetadata}
			/>
		);
	}

	return (
		<Subform>
			<SubformHeader>
				<FormHeaderContent table={props.table} titleOverride={props.titleOverride} descriptionAppend={props.descriptionAppend} language={props.language} />
				<nav>
					{addBtn}
				</nav>
			</SubformHeader>
			<SingleRecord
				tableId={props.table.id}
				recordId={activeRecordId}
				parentRecordId={props.parentRecordId}
				parentTableId={props.parentTableId}
				language={props.language}
				preventDelete={isSeoMetadata}
				isSubform
				isOneToOne
				slugWidgetData={isSeoMetadata && { tableId: props.parentTableId, recordId: props.parentRecordId }}
			/>
		</Subform>
	);


}

SubformSingle.propTypes = {
	table: PropTypes.object,
	activeRecords: PropTypes.array,
	childrenRecords: PropTypes.array,
	parentTableId: PropTypes.number,
	parentRecordId: PropTypes.string,
	titleOverride: PropTypes.string,
	descriptionAppend: PropTypes.string,

	language: PropTypes.string,
	addRecord: PropTypes.string,

};

import React from 'react';
import PropTypes from 'prop-types';

import { TabsList } from '../../../styles/Form';
import DragAndDrop from '../../utils/DragAndDrop';

import Tab from './Tab';
import AddRecord from '../../../containers/form/buttons/AddRecord';

export default function TabList(props) {
	return (<TabsList isSidebarView={props.isSidebarView}>
		<DragAndDrop>

			{
				props.childrenRecords.map((record, index) => {

					const active = record.id === props.activeRecordId;
					return (<Tab
						key={record.id}
						displayLabel={record.label}
						hasOrder={!!props.table.orderField}
						isActive={active}
						recordId={record.id}
						index={index}
						tableId={props.table.id}
						language={props.table.languageField ? props.language : null}
						parentRecordId={props.parentRecordId}
						setShownRecord={props.setShownRecord}
						swapRecords={props.swapRecords}
					/>);
				})
			}

			<AddRecord
				table={props.table}
				isTab
				parentRecordId={props.parentRecordId}
				parentTableId={props.parentTableId}
				highestOrder={props.highestOrder}
				language={props.language}
			/>
		</DragAndDrop>
	</TabsList>);
}

TabList.propTypes = {
	table: PropTypes.object,
	childrenRecords: PropTypes.array,
	parentTableId: PropTypes.number,
	parentRecordId: PropTypes.string,
	activeRecordId: PropTypes.string,
	language: PropTypes.string,
	highestOrder: PropTypes.number,
	isSidebarView: PropTypes.bool,

	swapRecords: PropTypes.func,
	setShownRecord: PropTypes.func,
};

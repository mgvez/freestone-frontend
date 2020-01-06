import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import { TabsContainer } from '../../../styles/Form';

import Tab from './Tab';
import AddRecord from '../../../containers/form/buttons/AddRecord';

export default class TabList extends Component {
	static propTypes = {
		table: PropTypes.object,
		childrenRecords: PropTypes.array,
		parentTableId: PropTypes.number,
		parentRecordId: PropTypes.string,
		activeRecordId: PropTypes.string,
		language: PropTypes.string,
		highestOrder: PropTypes.number,

		swapRecords: PropTypes.func,
		setShownRecord: PropTypes.func,
	};

	render() {
		return (<TabsContainer>
			<DndProvider backend={Backend}>

				{
					this.props.childrenRecords.map((record, index) => {

						const active = record.id === this.props.activeRecordId;
						return (<Tab
							key={record.id}
							displayLabel={record.label}
							hasOrder={!!this.props.table.orderField}
							isActive={active}
							recordId={record.id}
							index={index}
							tableId={this.props.table.id}
							language={this.props.table.languageField ? this.props.language : null}
							parentRecordId={this.props.parentRecordId}
							setShownRecord={this.props.setShownRecord}
							swapRecords={this.props.swapRecords}
						/>);
					})
				}

				<AddRecord
					table={this.props.table}
					isTab
					parentRecordId={this.props.parentRecordId}
					parentTableId={this.props.parentTableId}
					highestOrder={this.props.highestOrder}
					language={this.props.language}
				/>
			</DndProvider>
		</TabsContainer>);
	}
}

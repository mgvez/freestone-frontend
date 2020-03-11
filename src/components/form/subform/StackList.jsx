import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StackContainer } from '../../../styles/Form';
import Collapsable from '../../animation/Collapsable';

import Tab from './Tab';
import AddRecord from '../../../containers/form/buttons/AddRecord';
import SingleRecord from '../../../containers/form/SingleRecord';
import DragAndDrop from '../../utils/DragAndDrop';

export default class StackList extends Component {
	static propTypes = {
		table: PropTypes.object,
		childrenRecords: PropTypes.array,
		parentTableId: PropTypes.number,
		parentRecordId: PropTypes.string,
		activeRecords: PropTypes.array,
		language: PropTypes.string,
		highestOrder: PropTypes.number,

		swapRecords: PropTypes.func,
		toggleShownRecord: PropTypes.func,
	};

	render() {
		return (<StackContainer>
			<DragAndDrop>
				{
					this.props.childrenRecords.map((record, index) => {

						const active = this.props.activeRecords && this.props.activeRecords.find(activeRecord => record.id === activeRecord.id) && true;
						return (<div key={record.id}>
							<Tab
								key={`tab_${record.id}`}
								displayLabel={record.label || `section #${index + 1}`}
								hasOrder={!!this.props.table.orderField}
								isActive={active}
								recordId={record.id}
								index={index}
								tableId={this.props.table.id}
								language={this.props.table.languageField ? this.props.language : null}
								parentRecordId={this.props.parentRecordId}
								setShownRecord={this.props.toggleShownRecord}
								swapRecords={this.props.swapRecords}
							/>
							<Collapsable key={`rec_${record.id}`} isCollapsed={!active} animTime={0.5} className={`stack-record stack-record-${active && 'active'}`}>
								<SingleRecord 
									tableId={this.props.table.id}
									recordId={record.id}
									isInactive={!active}
									parentRecordId={this.props.parentRecordId}
									parentTableId={this.props.parentTableId}
									language={this.props.language}
									isSubform
								/>
							</Collapsable>
						</div>);

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
			</DragAndDrop>
		</StackContainer>);
	}
}

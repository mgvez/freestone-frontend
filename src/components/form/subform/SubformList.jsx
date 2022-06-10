import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SingleRecord from '../../../containers/form/SingleRecord';
import FormHeaderContent from '../../header/info/FormHeaderContent';
import ChangeSubformView from '../../../containers/form/buttons/ChangeSubformView';
import AddRecord from '../../../containers/form/buttons/AddRecord';
import Collapsable from '../../animation/Collapsable';
import ToggleCollapse from '../buttons/ToggleCollapse';

import { Subform, SubformHeader } from '../../../styles/Form';
import { GridItem } from '../../../styles/Grid';

/*
List of all records, all open, one over the other
*/
export default class SubformList extends Component {
	static propTypes = {
		table: PropTypes.object,
		activeRecords: PropTypes.array,
		childrenRecords: PropTypes.array,
		parentTableId: PropTypes.number,
		parentRecordId: PropTypes.string,
		highestOrder: PropTypes.number,
		language: PropTypes.string,
		isCollapsed: PropTypes.bool,
		editSchema: PropTypes.func,
		titleOverride: PropTypes.string,
		descriptionAppend: PropTypes.string,
		swapRecords: PropTypes.func,

		changeCollapsedState: PropTypes.func,
	};

	getContent() {
		return (<Collapsable isCollapsed={this.props.isCollapsed}>
			{
				this.props.childrenRecords.map((record) => {
					return (<SingleRecord 
						key={record.id}
						tableId={this.props.table.id}
						recordId={record.id}
						parentRecordId={this.props.parentRecordId}
						parentTableId={this.props.parentTableId}
						language={this.props.language}
						isSubform
					/>);
				})
			}
			{
				<AddRecord
					table={this.props.table}
					parentRecordId={this.props.parentRecordId}
					parentTableId={this.props.parentTableId}
					highestOrder={this.props.highestOrder}
					language={this.props.language}
					nRecords={this.props.childrenRecords.length}
				/>
			}
		</Collapsable>);
	}

	render() {
		if (!this.props.childrenRecords || !this.props.table) return null;

		const changeViewBtn = (!this.props.isCollapsed) ? <ChangeSubformView tableId={this.props.table.id} /> : null;
		const content = this.getContent();
		return (
			<Subform className="subform-list">
				<SubformHeader className="row">
					<GridItem columns="8">
						<FormHeaderContent table={this.props.table} titleOverride={this.props.titleOverride} descriptionAppend={this.props.descriptionAppend} language={this.props.language} />
					</GridItem>
					<GridItem columns="3" offset="10" className="fcn">
						{this.props.editSchema()}
						{changeViewBtn}
						<ToggleCollapse isCollapsed={this.props.isCollapsed} toggle={this.props.changeCollapsedState} />
					</GridItem>
				</SubformHeader>

				{content}

				
			</Subform>
		);

	}
}

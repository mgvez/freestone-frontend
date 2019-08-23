import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SingleRecord from '../../../containers/form/SingleRecord';
import FormHeaderContent from '../../header/FormHeaderContent';
import ChangeSubformView from '../../../containers/form/buttons/ChangeSubformView';
import AddRecord from '../../../containers/form/buttons/AddRecord';
import Collapsable from '../../animation/Collapsable';
import ToggleCollapse from '../buttons/ToggleCollapse';

import { Subform, SubformHeader } from '../../../styles/Form';
import { GridItem } from '../../../styles/Grid';

export default class SubformList extends Component {
	static propTypes = {
		table: PropTypes.object,
		activeRecord: PropTypes.object,
		childrenRecords: PropTypes.array,
		parentTableId: PropTypes.number,
		parentRecordId: PropTypes.string,
		highestOrder: PropTypes.number,
		language: PropTypes.string,
		isCollapsed: PropTypes.bool,
		titleOverride: PropTypes.string,
		descriptionAppend: PropTypes.string,
		swapRecords: PropTypes.func,
		setShownRecord: PropTypes.func,

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
						{changeViewBtn}
						<ToggleCollapse isCollapsed={this.props.isCollapsed} toggle={this.props.changeCollapsedState} />
					</GridItem>
				</SubformHeader>

				{content}

				
			</Subform>
		);

	}
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SingleRecord from '../../../containers/form/SingleRecord';
import FormHeaderContent from '../../header/FormHeaderContent';
import ChangeSubformView from '../../../containers/form/buttons/ChangeSubformView';
import AddRecord from '../../../containers/form/buttons/AddRecord';
import Collapsable from '../../animation/Collapsable';
import ToggleCollapse from '../buttons/ToggleCollapse';

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
			<section className="subform subform-list">
				<header className="row">
					<div className="col-md-8">
						<FormHeaderContent table={this.props.table} titleOverride={this.props.titleOverride} descriptionAppend={this.props.descriptionAppend} language={this.props.language} />
					</div>
					<div className="col-md-3 col-md-offset-1 fcn">
						{changeViewBtn}
						<ToggleCollapse isCollapsed={this.props.isCollapsed} toggle={this.props.changeCollapsedState} />
					</div>
				</header>
				{content}
			</section>
		);

	}
}

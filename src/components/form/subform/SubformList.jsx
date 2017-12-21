import React from 'react';

import SingleRecord from '../../../containers/form/SingleRecord';
import FormHeaderContent from '../../header/FormHeaderContent';
import ChangeSubformView from '../../../containers/form/buttons/ChangeSubformView';
import AddRecord from '../../../containers/form/buttons/AddRecord';
import CollapsableForm from './CollapsableForm';
import ToggleSubform from '../../../containers/form/buttons/ToggleSubform';

export default class SubformList extends CollapsableForm {
	static propTypes = {
		table: React.PropTypes.object,
		activeRecord: React.PropTypes.object,
		childrenRecords: React.PropTypes.array,
		parentTableId: React.PropTypes.number,
		parentRecordId: React.PropTypes.string,
		highestOrder: React.PropTypes.number,
		language: React.PropTypes.string,
		isCollapsed: React.PropTypes.bool,
		titleOverride: React.PropTypes.string,
		descriptionAppend: React.PropTypes.string,
		swapRecords: React.PropTypes.func,
		setShownRecord: React.PropTypes.func,

		setSubformCollapsed: React.PropTypes.func,
		onRequestToggleCollapse: React.PropTypes.func,
	};

	getContent() {
		if (!this.collapser.getOpenState()) return null;
		return (<div ref={this.setCollapsable}>
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
		</div>);
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
						<ToggleSubform isCollapsed={this.props.isCollapsed} tableId={this.props.table.id} toggle={this.collapser.toggle} />
					</div>
				</header>
				{content}
			</section>
		);

	}
}

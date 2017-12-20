import React from 'react';

import { TabList } from './TabList';
import { CollapsableForm } from './CollapsableForm';
import SingleRecord from '../../../containers/form/SingleRecord';
import { ChangeSubformView } from '../buttons/ChangeSubformView';
import FormHeaderContent from '../../header/FormHeaderContent';
import { ToggleSubform } from '../buttons/ToggleSubform';

export class SubformTabbed extends CollapsableForm {
	static propTypes = {
		table: React.PropTypes.object,
		activeRecord: React.PropTypes.object,
		childrenRecords: React.PropTypes.array,
		language: React.PropTypes.string,
		parentRecordId: React.PropTypes.string,
		parentTableId: React.PropTypes.number,
		titleOverride: React.PropTypes.string,
		descriptionAppend: React.PropTypes.string,

		isCollapsed: React.PropTypes.bool,
	};

	getContent() {
		if (!this.collapser.getOpenState()) return null;

		const activeRecordId = this.props.activeRecord && this.props.activeRecord.id;

		return (<div ref={this.setCollapsable}>
			<TabList {...this.props} activeRecordId={activeRecordId} />
			<SingleRecord
				tableId={this.props.table.id}
				parentRecordId={this.props.parentRecordId}
				parentTableId={this.props.parentTableId}
				recordId={activeRecordId}
				language={this.props.language}
				isSubform
			/>
		</div>);
	}

	render() {
		if (!this.props.childrenRecords || !this.props.table) return null;
		//on peut mettre en liste uniquement si la table n'a pas de children, sinon le formulaire deient très confus
		const changeViewBtn = (!this.props.table.hasChildren && !this.props.isCollapsed) ? <ChangeSubformView tableId={this.props.table.id} /> : null;
		const content = this.getContent();
		return (
			<section className="subform">
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

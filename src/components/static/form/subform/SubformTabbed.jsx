import React from 'react';

import { TabList } from 'components/static/form/subform/TabList';
import { SingleRecord } from 'components/connected/form/SingleRecord';
import { ChangeSubformView } from 'components/connected/form/buttons/ChangeSubformView';
import { Header } from 'components/static/form/Header';
import { ToggleSubform } from 'components/connected/form/buttons/ToggleSubform';
import { CollapsableForm } from 'components/static/form/subform/CollapsableForm';


export class SubformTabbed extends CollapsableForm {
	static propTypes = {
		table: React.PropTypes.object,
		activeRecord: React.PropTypes.object,
		childrenRecords: React.PropTypes.array,
		language: React.PropTypes.string,
		parentRecordId: React.PropTypes.string,
		isCollapsed: React.PropTypes.bool,
	};

	getContent() {
		if (!this.collapser.getOpenState()) return null;

		const activeRecordId = this.props.activeRecord && this.props.activeRecord.id;

		return (<div ref={this.setCollapsable}>
			<TabList {...this.props} activeRecordId={activeRecordId} />
			<SingleRecord tableId={this.props.table.id} parentRecordId={this.props.parentRecordId} recordId={activeRecordId} language={this.props.language} />
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
						<Header table={this.props.table} />
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

import React, { Component } from 'react';

import { SingleRecord } from 'components/connected/form/SingleRecord';
import { Header } from 'components/static/form/Header';
import { ChangeSubformView } from 'components/connected/form/buttons/ChangeSubformView';
import { AddRecord } from 'components/connected/form/buttons/AddRecord';
import { CollapsableForm } from 'components/static/form/subform/CollapsableForm';
import { ToggleSubform } from 'components/connected/form/buttons/ToggleSubform';

export class SubformList extends CollapsableForm {
	static propTypes = {
		table: React.PropTypes.object,
		activeRecord: React.PropTypes.object,
		childrenRecords: React.PropTypes.array,
		parentTableId: React.PropTypes.number,
		parentRecordId: React.PropTypes.string,
		highestOrder: React.PropTypes.number,
		language: React.PropTypes.string,
		isCollapsed: React.PropTypes.bool,

		swapRecords: React.PropTypes.func,
		setShownRecord: React.PropTypes.func,

		setSubformCollapsed: React.PropTypes.func,
		onRequestToggleCollapse: React.PropTypes.func,
	};

	constructor(props) {
		super(props);
	}

	getContent() {
		if (!this.collapser.getOpenState()) return null;
		return (<div ref={this.setCollapsable}>
			{
				this.props.childrenRecords.map((record, index) => {
					return <SingleRecord key={record.id} tableId={this.props.table.id} recordId={record.id} language={this.props.language}/>;
				})
			}
			{
				<AddRecord
					table={this.props.table}
					parentRecordId={this.props.parentRecordId}
					parentTableId={this.props.parentTableId}
					highestOrder={this.props.highestOrder}
				/>
			}
		</div>);
	}

	render() {
		if (!this.props.childrenRecords || !this.props.table) return null;
		const activeRecordId = this.props.activeRecord && this.props.activeRecord.id;

		const changeViewBtn = (!this.props.isCollapsed) ? <ChangeSubformView tableId={this.props.table.id} /> : null;
		const content = this.getContent();
		return (
			<section className="subform subform-list">
				<header className="row">
					<div className="col-md-8">
						<Header table={this.props.table} />
					</div>
					<div className="col-md-3 col-md-offset-1 fcn">
						{ changeViewBtn }
						<ToggleSubform isCollapsed={this.props.isCollapsed} tableId={this.props.table.id} toggle={this.collapser.toggle} />
					</div>
				</header>
				{ content }
			</section>
		);

	}
}
